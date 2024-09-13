import ultralytics
import os
import torch
import torchvision
from ultralytics import YOLO

# Path to the dataset configuration file
dataset_config = 'main.yaml'

# Check if the dataset configuration file exists
if not os.path.exists(dataset_config):
    print(f"Dataset configuration file {dataset_config} does not exist.")
    exit(1)

# Print the absolute path of the dataset configuration file for debugging
print("Dataset configuration file absolute path:", os.path.abspath(dataset_config))

try:
    # Initialize the YOLO model
    model = YOLO('yolov5s.pt')

    # Train the model using the dataset configuration file
    model.train(data=dataset_config, epochs=50, imgsz=640, batch=16, project='runs/train/my_dent_detection_experiment', name='yolov5s_results')

    # Validate the model
    val_results = model.val(data=dataset_config)
    print('Validation Results:', val_results)

    # Test the model
    test_results = model.val(data=dataset_config, split='test')
    print('Test Results:', test_results)

except Exception as e:
    print('Something went wrong:', e)
