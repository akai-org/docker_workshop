# But how to kill the whole app?
# You have to stop and remove each element individually
#

docker stop frontend backend db
docker rm frontend backend db
docker network rm chat-net
if $1 == "kill-volumes" ; then
  echo "Removing volumes as well"
  docker volume rm pg-data
else
  echo "Keeping volumes (pass 'kill-volumes' to remove them)"
  exit 0
fi