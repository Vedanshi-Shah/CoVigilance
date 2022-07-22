
import streamlit as st
import pandas as pd
import cv2
from PIL import Image, ImageEnhance
import numpy as np
import os
#import tensorflow as tf
#import tensorflow_hub as hub
import time ,sys
from streamlit_embedcode import github_gist
import urllib.request
import urllib
import moviepy.editor as moviepy
import cv2
import numpy as np
import time
import sys
import json
import requests
import redis
import websocket
import time
import random
import cv2
import imutils
import cv2
import os
import argparse
import numpy as np
import matplotlib.pyplot as plt
from os.path import dirname, join
from imutils.video import VideoStream
from scipy.spatial import distance as dist
from scipy.spatial.distance import euclidean
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from firebase import firebase
from cryptography.fernet import Fernet
if(not os.path.exists('yolov3.weights')):
    
    url = "https://pjreddie.com/media/files/yolov3.weights"
    r = requests.get(url, allow_redirects=True)
    open('yolov3.weights', 'wb').write(r.content)
    time.sleep(15)

net=cv2.dnn.readNetFromDarknet("yolov3.cfg","yolov3.weights")
ln = net.getLayerNames()
ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

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
    cv2.imshow('Social Distancing Violation',frame)

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
    cv2.imshow('Mask Violations',frame2)
    return count_mask_violations,count_social_distancing,frame
def object_detection_video():
    x=[]
    y=[]
    normal = 0
    crowded = 0
    count = 0
    prev_val=0
    st.title("Object Detection for Videos")
    st.subheader("""
    This object detection project takes in a video and outputs the video with bounding boxes created around the objects in the video 
    """
    )
    uploaded_video = st.file_uploader("Upload Video", type = ['mp4','mpeg','mov'])
    if uploaded_video != None:
        
        vid = uploaded_video.name
        with open(vid, mode='wb') as f:
            f.write(uploaded_video.read()) # save video to disk

        st_video = open(vid,'rb')
        video_bytes = st_video.read()
        st.video(video_bytes)
        st.write("Uploaded Video")
        cap1=cv2.VideoCapture(vid)
        cap2=cv2.VideoCapture(vid)
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
                    #firebase.post('/placeA/zone1/data/',data)
                    if count%31 == 0:
                        if (crowded > normal):
                            data_count = {'count' : 1}
                            #firebase.post('/placeA/zone1/count/',data_count)
                        else:
                            data_count = {'count' : 0}
                            #firebase.post('/placeA/zone1/count/',data_count)
                    prev_val=avg
                    #ws.send(json.dumps({'socialD':socialD,'mask':mask}))
            frame_count+=1
            key = cv2.waitKey(1) & 0xFF
            if key == ord("q"):
                break
        cap1.release()
        cap2.release()
        cv2.destroyAllWindows()
    # CONFIDENCE = 0.5
    # SCORE_THRESHOLD = 0.5
    # IOU_THRESHOLD = 0.5
    # config_path = 'yolov3.cfg'
    # weights_path = 'yolov3.weights'
    # font_scale = 1
    # thickness = 1
    # url = "https://raw.githubusercontent.com/zhoroh/ObjectDetection/master/labels/coconames.txt"
    # f = urllib.request.urlopen(url)
    # labels = [line.decode('utf-8').strip() for  line in f]
    
    # colors = np.random.randint(0, 255, size=(len(labels), 3), dtype="uint8")

    # net = cv2.dnn.readNetFromDarknet(config_path, weights_path)

    # ln = net.getLayerNames()
    # ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    # st.title("Object Detection for Videos")
    # st.subheader("""
    # This object detection project takes in a video and outputs the video with bounding boxes created around the objects in the video 
    # """
    # )
    # uploaded_video = st.file_uploader("Upload Video", type = ['mp4','mpeg','mov'])
    # if uploaded_video != None:
        
    #     vid = uploaded_video.name
    #     with open(vid, mode='wb') as f:
    #         f.write(uploaded_video.read()) # save video to disk

    #     st_video = open(vid,'rb')
    #     video_bytes = st_video.read()
    #     st.video(video_bytes)
    #     st.write("Uploaded Video")
    #     cap = cv2.VideoCapture(vid)
    #     _, image = cap.read()
    #     h, w = image.shape[:2]
    #     #out = cv2.VideoWriter(output_name, cv2.VideoWriter_fourcc#(*'avc3'), fps, insize)




    #     fourcc = cv2.VideoWriter_fourcc(*'mpv4')
    #     out = cv2.VideoWriter("detected_video.mp4", fourcc, 20.0, (w, h))
    #     count = 0
    #     while True:
    #         _, image = cap.read()
    #         if _ != False:
    #             h, w = image.shape[:2]
    #             blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), swapRB=True, crop=False)
    #             net.setInput(blob)
    #             start = time.perf_counter()
    #             layer_outputs = net.forward(ln)
    #             time_took = time.perf_counter() - start
    #             count +=1
    #             print(f"Time took: {count}", time_took)
    #             boxes, confidences, class_ids = [], [], []

    #             # loop over each of the layer outputs
    #             for output in layer_outputs:
    #                 # loop over each of the object detections
    #                 for detection in output:
    #                     # extract the class id (label) and confidence (as a probability) of
    #                     # the current object detection
    #                     scores = detection[5:]
    #                     class_id = np.argmax(scores)
    #                     confidence = scores[class_id]
    #                     # discard weak predictions by ensuring the detected
    #                     # probability is greater than the minimum probability
    #                     if confidence > CONFIDENCE:
    #                         # scale the bounding box coordinates back relative to the
    #                         # size of the image, keeping in mind that YOLO actually
    #                         # returns the center (x, y)-coordinates of the bounding
    #                         # box followed by the boxes' width and height
    #                         box = detection[:4] * np.array([w, h, w, h])
    #                         (centerX, centerY, width, height) = box.astype("int")

    #                         # use the center (x, y)-coordinates to derive the top and
    #                         # and left corner of the bounding box
    #                         x = int(centerX - (width / 2))
    #                         y = int(centerY - (height / 2))

    #                         # update our list of bounding box coordinates, confidences,
    #                         # and class IDs
    #                         boxes.append([x, y, int(width), int(height)])
    #                         confidences.append(float(confidence))
    #                         class_ids.append(class_id)

    #             # perform the non maximum suppression given the scores defined before
    #             idxs = cv2.dnn.NMSBoxes(boxes, confidences, SCORE_THRESHOLD, IOU_THRESHOLD)

    #             font_scale = 0.6
    #             thickness = 1

    #             # ensure at least one detection exists
    #             if len(idxs) > 0:
    #                 # loop over the indexes we are keeping
    #                 for i in idxs.flatten():
    #                     # extract the bounding box coordinates
    #                     x, y = boxes[i][0], boxes[i][1]
    #                     w, h = boxes[i][2], boxes[i][3]
    #                     # draw a bounding box rectangle and label on the image
    #                     color = [int(c) for c in colors[class_ids[i]]]
    #                     cv2.rectangle(image, (x, y), (x + w, y + h), color=color, thickness=thickness)
    #                     text = f"{labels[class_ids[i]]}: {confidences[i]:.2f}"
    #                     # calculate text width & height to draw the transparent boxes as background of the text
    #                     (text_width, text_height) = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, fontScale=font_scale, thickness=thickness)[0]
    #                     text_offset_x = x
    #                     text_offset_y = y - 5
    #                     box_coords = ((text_offset_x, text_offset_y), (text_offset_x + text_width + 2, text_offset_y - text_height))
    #                     overlay = image.copy()
    #                     cv2.rectangle(overlay, box_coords[0], box_coords[1], color=color, thickness=cv2.FILLED)
    #                     # add opacity (transparency to the box)
    #                     image = cv2.addWeighted(overlay, 0.6, image, 0.4, 0)
    #                     # now put the text (label: confidence %)
    #                     cv2.putText(image, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX,
    #                         fontScale=font_scale, color=(0, 0, 0), thickness=thickness)

    #             out.write(image)
    #             cv2.imshow("image", image)
                
    #             if ord("q") == cv2.waitKey(1):
    #                 break
    #         else:
    #             break


    #     #return "detected_video.mp4"
            
    #     cap.release()
    #     cv2.destroyAllWindows()
        
    
        
        

# def object_detection_image():
#     st.title('Object Detection for Images')
#     st.subheader("""
#     This object detection project takes in an image and outputs the image with bounding boxes created around the objects in the image
#     """)
#     file = st.file_uploader('Upload Image', type = ['jpg','png','jpeg'])
#     if file!= None:
#         img1 = Image.open(file)
#         img2 = np.array(img1)

#         st.image(img1, caption = "Uploaded Image")
#         my_bar = st.progress(0)
#         confThreshold =st.slider('Confidence', 0, 100, 50)
#         nmsThreshold= st.slider('Threshold', 0, 100, 20)
#         #classNames = []
#         whT = 320
#         url = "https://raw.githubusercontent.com/zhoroh/ObjectDetection/master/labels/coconames.txt"
#         f = urllib.request.urlopen(url)
#         classNames = [line.decode('utf-8').strip() for  line in f]
#         #f = open(r'C:\Users\Olazaah\Downloads\stream\labels\coconames.txt','r')
#         #lines = f.readlines()
#         #classNames = [line.strip() for line in lines]
#         config_path = 'yolov3.cfg'
#         weights_path = 'yolov3.weights'
#         net = cv2.dnn.readNetFromDarknet(config_path, weights_path)
#         net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
#         net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)

#         def findObjects(outputs,img):
#             hT, wT, cT = img2.shape
#             bbox = []
#             classIds = []
#             confs = []
#             for output in outputs:
#                 for det in output:
#                     scores = det[5:]
#                     classId = np.argmax(scores)
#                     confidence = scores[classId]
#                     if confidence > (confThreshold/100):
#                         w,h = int(det[2]*wT) , int(det[3]*hT)
#                         x,y = int((det[0]*wT)-w/2) , int((det[1]*hT)-h/2)
#                         bbox.append([x,y,w,h])
#                         classIds.append(classId)
#                         confs.append(float(confidence))
        
#             indices = cv2.dnn.NMSBoxes(bbox, confs, confThreshold/100, nmsThreshold/100)
#             obj_list=[]
#             confi_list =[]
#             #drawing rectangle around object
#             for i in indices:
#                 i = i
#                 box = bbox[i]
#                 x, y, w, h = box[0], box[1], box[2], box[3]
#                 # print(x,y,w,h)
#                 cv2.rectangle(img2, (x, y), (x+w,y+h), (240, 54 , 230), 2)
#                 #print(i,confs[i],classIds[i])
#                 obj_list.append(classNames[classIds[i]].upper())
                
#                 confi_list.append(int(confs[i]*100))
#                 cv2.putText(img2,f'{classNames[classIds[i]].upper()} {int(confs[i]*100)}%',
#                           (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 1, (240, 0, 240), 2)
#             df= pd.DataFrame(list(zip(obj_list,confi_list)),columns=['Object Name','Confidence'])
#             if st.checkbox("Show Object's list" ):
                
#                 st.write(df)
#             if st.checkbox("Show Confidence bar chart" ):
#                 st.subheader('Bar chart for confidence levels')
                
#                 st.bar_chart(df["Confidence"])
           
#         blob = cv2.dnn.blobFromImage(img2, 1 / 255, (whT, whT), [0, 0, 0], 1, crop=False)
#         net.setInput(blob)
#         layersNames = net.getLayerNames()
#         outputNames = [layersNames[i-1] for i in net.getUnconnectedOutLayers()]
#         outputs = net.forward(outputNames)
#         findObjects(outputs,img2)
    
#         st.image(img2, caption='Proccesed Image.')
        
#         cv2.waitKey(0)
        
#         cv2.destroyAllWindows()
#         my_bar.progress(100)




def main():
    #download_model()
    new_title = '<p style="font-size: 42px;">Welcome to my Object Detection App!</p>'
    read_me_0 = st.markdown(new_title, unsafe_allow_html=True)

    
    # st.sidebar.title("Select Activity")
    # choice  = st.sidebar.selectbox("MODE",("About","Object Detection(Image)","Object Detection(Video)"))
    # #["Show Instruction","Landmark identification","Show the #source code", "About"]
    
    # if choice == "Object Detection(Image)":
    #     #st.subheader("Object Detection")
    #     read_me_0.empty()
    #     read_me.empty()
    #     #st.title('Object Detection')
    #     object_detection_image()
    
    read_me_0.empty()
    # read_me.empty()
    #object_detection_video.has_beenCalled = False
    object_detection_video()
    #if object_detection_video.has_beenCalled:
    # try:

    #     clip = moviepy.VideoFileClip('detected_video.mp4')
    #     clip.write_videofile("myvideo.mp4")
    #     st_video = open('myvideo.mp4','rb')
    #     video_bytes = st_video.read()
    #     st.video(video_bytes)
    #     st.write("Detected Video") 
    # except OSError:
    #         ''

    # elif choice == "About":
    #     print()
        

if __name__ == '__main__':
		main()	



