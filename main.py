import cv2
import numpy as np
import os
import time
import requests
import imutils
import requests
from scipy.spatial import distance as dist
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from firebase import firebase
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

firebase = firebase.FirebaseApplication('https://covigilence1-ecf6e-default-rtdb.asia-southeast1.firebasedatabase.app/', None)
if(not os.path.exists('yolov3.weights')):
    url = "https://pjreddie.com/media/files/yolov3.weights"
    r = requests.get(url, allow_redirects=True)
    open('yolov3.weights', 'wb').write(r.content)
    time.sleep(10)

net=cv2.dnn.readNetFromDarknet("yolov3.cfg","yolov3.weights")
ln = net.getLayerNames()
ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]

prototxtPath = r"deploy.protext"
weightsPath = r"res10_300x300_ssd_iter_140000.caffemodel"
faceNet = cv2.dnn.readNet(prototxtPath, weightsPath)
maskNet = load_model("mask_detector.model")
def people_detection(frame,net,ln,id=0):
    (H,W)=frame.shape[:2]
    results=[]
    blob=cv2.dnn.blobFromImage(frame,1/255.0,(416,416),swapRB=True,crop=False)
    net.setInput(blob)
    layerOutputs=net.forward(ln)
    
    boxes=[]
    centroids=[]
    confidences=[]
    for o in layerOutputs:
        for d in o:
            scores=d[5:]
            classID=np.argmax(scores)
            confidence=scores[classID]
            if classID==id and confidence>0.3:
                box=d[0:4]*np.array([W,H,W,H])
                (centerX,centerY,width,height)=box.astype("int")
                
                x=int(centerX-(width/2))
                y=int(centerY-(height)/2)
                boxes.append([x,y,int(width),int(height)])
                centroids.append([centerX,centerY])
                confidences.append(float(confidence))
    idxs=cv2.dnn.NMSBoxes(boxes,confidences,0.3,0.3)
    if(len(idxs)>0):
        for i in idxs.flatten():
            (x,y)=(boxes[i][0],boxes[i][1])
            (w,h)=(boxes[i][2],boxes[i][3])
            r=(confidences[i],(x,y,x+w,y+h),centroids[i])
            results.append(r)
    return results

def detect_and_predict_mask(frame, faceNet, maskNet):
	# grab the dimensions of the frame and then construct a blob
	# from it
	(h, w) = frame.shape[:2]
	blob = cv2.dnn.blobFromImage(frame, 1.0, (224, 224),(104.0, 177.0, 123.0))

	# pass the blob through the network and obtain the face detections
	faceNet.setInput(blob)
	detections = faceNet.forward()
	

	# initialize our list of faces, their corresponding locations,
	# and the list of predictions from our face mask network
	faces = []
	locs = []
	preds = []

	# loop over the detections
	for i in range(0, detections.shape[2]):
		# extract the confidence (i.e., probability) associated with
		# the detection
		confidence = detections[0, 0, i, 2]

		# filter out weak detections by ensuring the confidence is
		# greater than the minimum confidence
		if confidence > 0.5:
			# compute the (x, y)-coordinates of the bounding box for
			# the object
			box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
			(startX, startY, endX, endY) = box.astype("int")

			# ensure the bounding boxes fall within the dimensions of
			# the frame
			(startX, startY) = (max(0, startX), max(0, startY))
			(endX, endY) = (min(w - 1, endX), min(h - 1, endY))

			# extract the face ROI, convert it from BGR to RGB channel
			# ordering, resize it to 224x224, and preprocess it
			face = frame[startY:endY, startX:endX]
			face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
			face = cv2.resize(face, (224, 224))
			face = img_to_array(face)
			face = preprocess_input(face)

			# add the face and bounding boxes to their respective
			# lists
			faces.append(face)
			locs.append((startX, startY, endX, endY))

	# only make a predictions if at least one face was detected
	if len(faces) > 0:
		# for faster inference we'll make batch predictions on *all*
		# faces at the same time rather than one-by-one predictions
		# in the above `for` loop
		faces = np.array(faces, dtype="float32")
		preds = maskNet.predict(faces, batch_size=32)

	# return a 2-tuple of the face locations and their corresponding
	# locations
	return (locs, preds)
#====================================================================================================#

#Defining the Pipeline Function for processing the frames.

#====================================================================================================#
def pipeline(frame1,frame2):
    
    count_social_distancing = 0
    count_mask_violations = 0
    #Social Distancing Detection.
    frame = imutils.resize(frame1,width=700)
    results=people_detection(frame,net,ln,0)
    violate=set()
    if(len(results)>=2):
        centroids=np.array([r[2] for r in results])
        D=dist.cdist(centroids,centroids,metric="euclidean")
        for i in range(0,D.shape[0]):
            for j in range(i+1,D.shape[1]):
                if D[i,j]<50:
                    violate.add(i)
                    violate.add(j)
    for (i,(prob,bbox,centroid)) in enumerate(results):
        (startX,startY,endX,endY)=bbox
        (cX,cY)=centroid
        color=(0,255,0)
        if i in violate:
            count_social_distancing += 1
            color=(0,0,255)
        cv2.rectangle(frame,(startX,startY),(endX,endY),color,2)
        cv2.circle(frame,(cX,cY),5,color,1)
    cv2.putText(frame,str(len(violate)),(10,frame.shape[0]-25),cv2.FONT_HERSHEY_SIMPLEX,0.85,(0,0,255),3)

    #mask detection
    frame2 = imutils.resize(frame2, width=400)
    (locs, preds) = detect_and_predict_mask(frame2, faceNet, maskNet)

    for (box, pred) in zip(locs, preds):
    # unpack the bounding box and predictions
        (startX, startY, endX, endY) = box
        (mask, withoutMask) = pred

        # determine the class label and color we'll use to draw
        # the bounding box and text
        label = "Mask" if mask > withoutMask else "No Mask"
        color = (0, 255, 0) if label == "Mask" else (0, 0, 255)

        if mask < withoutMask:
            count_mask_violations += 1

        # include the probability in the label
        label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)

        # display the label and bounding box rectangle on the output
        # framexs
        cv2.putText(frame2, label, (startX, startY - 10),cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
        cv2.rectangle(frame2, (startX, startY), (endX, endY), color, 2)
    return count_mask_violations,count_social_distancing,frame

x=[]
y=[]
normal = 0
crowded = 0
count = 0
prev_val=0


#Download the file ka code yaha pe aayega.
# uploaded_video = st.file_uploader("Upload Video", type = ['mp4','mpeg','mov'])
# if(not os.path.exists(os.environ['aaa'])):
#     #Add the path of firebase database of the video.
#     url = "https://pjreddie.com/media/files/yolov3.weights"
#     r = requests.get(url, allow_redirects=True)
#     open('yolov3.weights', 'wb').write(r.content)
#     time.sleep(15)


import os
uploaded_video=os.environ['video']
if uploaded_video != None:
    videos=db.collection(u'videos')
    vid=videos.stream()
    vid_list=[]
    for v in vid:
        vid_list.append(v.to_dict())
    l=None
    for k in vid_list:
        if(k['Name']==uploaded_video):
            l=k['Link']
    if(not(l)):
        print("File not found")
    else:
        print(l)
        try:
            r = requests.get(l, allow_redirects=True)
            with open(uploaded_video, 'wb') as f:
                f.write(r.content)
        except:
            print('gtg')

    # with open(vid, mode='wb') as f:
    #     f.write(uploaded_video.read()) # save video to disk
    # st_video = open(vid,'rb')
    # video_bytes = st_video.read()
    cap1=cv2.VideoCapture(uploaded_video)
    cap2=cv2.VideoCapture(uploaded_video)
    if not cap1.isOpened():
        cap1=cv2.VideoCapture(0)
    if not cap1.isOpened():
        raise IOError('Cannot open video')
    frame_count=1
    if not cap2.isOpened():
        cap2=cv2.VideoCapture(0)
    if not cap2.isOpened():
        raise IOError('Cannot open video')
    frame_count=1

    while True:
        if (count%3 == 0):
            normal = 0
            crowded = 0
        grabbed1,frame1=cap1.read()
        grabbed2,frame2=cap2.read()
        if not grabbed1:
            break
        if not grabbed2:
            break
        if(frame_count%15==0):
            x.append(frame_count)
            if(grabbed1 and grabbed2):
                mask,socialD,frame=pipeline(frame1,frame2)
                total=mask+socialD
                if(prev_val==0):
                    avg=total
                else:
                    avg=(0.8*prev_val)+(0.2*total)
                if((prev_val)>avg):
                    normal += 1
                    count += 1
                else:
                    crowded += 1
                    count += 1
                data={
                    'mask':mask,
                    'socialD':socialD,
                    'total':total,
                }
                #data=json.dumps(data,indent=4)
                firebase.post('/placeA/zone1/data/',data)
                if count%31 == 0:
                    if (crowded > normal):
                        data_count = {'count' : 1}
                        firebase.post('/placeA/zone1/count/',data_count)
                    else:
                        data_count = {'count' : 0}
                        firebase.post('/placeA/zone1/count/',data_count)
                prev_val=avg
                #ws.send(json.dumps({'socialD':socialD,'mask':mask}))
        frame_count+=1
    cap1.release()
    cap2.release()
    cv2.destroyAllWindows()
