INPUT=$1
OUTPUT=$2
FORMAT=$3
ID=$4
EMAIL=$5

export PATH="/var/www/html/data:$PATH"
if [ ! -z "$EMAIL" ];then
    src/send_email.py start $ID $EMAIL
fi

cd ../../../home/mamammel/MURI/regSNP/regsnp_intron/
python regsnp_intron.py -f --iformat $FORMAT $INPUT $OUTPUT

if [ ! -z "$EMAIL" ] && [ -s "$OUTPUT/snp.prediction.json" ];then
    src/send_email.py end $ID $EMAIL
fi

