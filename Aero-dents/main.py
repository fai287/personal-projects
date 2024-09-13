import torch
import torchvision
import ultralytics
import os
from ultralytics import YOLO

#data path for the train ,test and vaidation
train_data = 'train/images'
test_data = 'test/images'
val_data = 'valid/images'


if os.path.exists(val_data):
    print('file exists.')
else:
        print('file does not exist.')
        print('All them data exists')


    


#initiliase the yolo model
model = YOLO('yolov5s.pt')

#training the model
print('starting to train the model')

try:
    # train the model
    model.train(data={
        'train': train_data,
        'val': val_data,
    }, epochs=50, imgsz=640, batch=16, project='runs/train/my_dent_detection_experiment', 
    name='yolov5s_results')
except Exception as e:
    print('Something went wrong:',e)



#indicates the start of validation
print('starting the validation process')

#validate model
val_results = model.val(data=val_data)

#model validated
print('model validated:', val_results)


