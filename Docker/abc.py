import docker
client = docker.from_env()
client.containers.run("abc",environment=['aaa=jjj'], detach=True)