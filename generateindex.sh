#! /bin/sh
FILE_LIST=$(find . -name "*.md")
if [ -f map.txt ]; then
        rm map.txt
fi
for file in $FILE_LIST; do
        PAGE_SUMMARY=$(head -n 14 "$file" | tail -n 10 | tr '\n' " ")
        echo $file \"$PAGE_SUMMARY\" >> map.txt
done
cat map.txt | sha256sum > map.txt.sha2