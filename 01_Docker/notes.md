# Cleaning up
```bash
REPOSITORY             TAG       IMAGE ID       CREATED          SIZE
ubuntu2204-python310   latest    NEW_IMAGE_ID   10 seconds ago   445MB
<none>                 <none>    56a55d37640f   15 minutes ago   451MB

docker image prune -f  # Removes all dangling/untagged images

# Resault
REPOSITORY             TAG       IMAGE ID       CREATED          SIZE
ubuntu2204-python310   latest    NEW_IMAGE_ID   10 seconds ago   445MB
```