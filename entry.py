from fastapi import FastAPI
import docker
app=FastAPI()
@app.get("/getAnalytics/{video_name}")
async def read_video(video_name: str):
    client = docker.from_env()
    e='video='+video_name
    client.containers.run("try",environment=[e], detach=True)
    return {"Processing Successfuly"}