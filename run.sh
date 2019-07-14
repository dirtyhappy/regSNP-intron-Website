INPUT=$1
OUTPUT=$2
FORMAT=$3
ID=$4
EMAIL=$5

export PATH="/var/www/html/data:$PATH"
if [ ! -z "$EMAIL" ];then
    src/send_email.py start $ID $EMAIL
fi

regsnp_intron -f --iformat $FORMAT -s  /home/larsmay/Muri/regsnp/regsnp_intron/regsnp_intron/settings/settings.json $INPUT $OUTPUT

if [ ! -z "$EMAIL" ] && [ -s "$OUTPUT/snp.prediction.json" ];then
    src/send_email.py end $ID $EMAIL
fi

