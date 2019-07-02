INPUT=$1
OUTPUT=$2
FORMAT=$3
ID=$4
EMAIL=$5

export PATH="/data/linhai/bin/src/anaconda2/bin:/data/linhai/bin/src/bedtools2/bin:$PATH"
if [ ! -z "$EMAIL" ];then
    src/send_email.py start $ID $EMAIL
fi

regsnp_intron -f --iformat $FORMAT -s /data/linhai/bin/src/anaconda2/lib/python2.7/site-packages/regsnp_intron/settings/settings.json $INPUT $OUTPUT

if [ ! -z "$EMAIL" ] && [ -s "$OUTPUT/snp.prediction.json" ];then
    src/send_email.py end $ID $EMAIL
fi

