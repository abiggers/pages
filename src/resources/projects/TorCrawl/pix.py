import subprocess


#function to extract the exif data from the image and return it as a python dictionary
def extract_exif(pic):
    exif_dictionary = {}
    results = subprocess.run(['exiftool','-a','-scanForXMP','-ee','-U', pic], stdout=subprocess.PIPE)
    normal_string = results.stdout.decode("utf-8")
    split_lines = normal_string.split('\n')
    for each in split_lines:
        a = str(each).split(':')
        if len(a) > 1:
            exif_dictionary[a[0].strip()] = a[1].strip()
    return exif_dictionary






print(extract_exif('1.png'))