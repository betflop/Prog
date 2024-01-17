current_date=$(date +"%Y-%m-%d")
file="backup-$current_date.dump"
pg_dump --host=localhost --port=5430 --username=admin  --dbname=spef -f ${file}
bucket='spefbackup' ;\
resource="/${bucket}/${file}" ;\
contentType="application/octet-stream" ;\
dateValue=`date -R` ;\
stringToSign="PUT\n\n${contentType}\n${dateValue}\n${resource}" ;\
s3Key='' ;\
s3Secret='' ;\
signature=`echo -en ${stringToSign} | openssl sha1 -hmac ${s3Secret} -binary | base64` ;\
curl -vvv -X PUT -T "${file}" \
-H "Host: ${bucket}.storage.yandexcloud.net" \
-H "Date: ${dateValue}" \
-H "Content-Type: ${contentType}" \
-H "Authorization: AWS ${s3Key}:${signature}" \
https://${bucket}.storage.yandexcloud.net/${file}

# Set the API token and chat ID
CHAT_ID=""

# Set the message text
MESSAGE="Created backup ${file}"

# Use the curl command to send the message
curl -s -X POST https://api.telegram.org/bot$API_TOKEN/sendMessage -d chat_id=$CHAT_ID -d text="$MESSAGE"
