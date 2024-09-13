import os
from ultralytics import YOLO
import shutil
import yaml

# Paths
base_dir = 'C:/Users/hp/Desktop/Aero-dents/datasets'
train_image_dir = os.path.join(base_dir, 'train/images')
test_image_dir = os.path.join(base_dir, 'test/images')
val_image_dir = os.path.join(base_dir, 'valid/images')
val_label_dir = os.path.join(base_dir, 'valid/labels')
#annotated_val_image_dir = os.path.join(base_dir, 'valid/annotated_images')
#non_annotated_val_image_dir = os.path.join(base_dir, 'valid/non_annotated_images')

'''# Create directories if they don't exist
os.makedirs(annotated_val_image_dir, exist_ok=True)
os.makedirs(non_annotated_val_image_dir, exist_ok=True)

# List of validation image files
val_image_files = [f for f in os.listdir(val_image_dir) if os.path.isfile(os.path.join(val_image_dir, f))]'''

'''# Check for corresponding annotation files in validation set
for image_file in val_image_files:
    image_base_name = os.path.splitext(image_file)[0]
    label_file = os.path.join(val_label_dir, image_base_name + '.txt')
    
    if os.path.exists(label_file):
        shutil.copy(os.path.join(val_image_dir, image_file), os.path.join(annotated_val_image_dir, image_file))
        shutil.copy(label_file, os.path.join(annotated_val_image_dir, image_base_name + '.txt'))
    else:
        shutil.copy(os.path.join(val_image_dir, image_file), os.path.join(non_annotated_val_image_dir, image_file))
        # Create an empty label file for non-annotated images
        open(os.path.join(non_annotated_val_image_dir, image_base_name + '.txt'), 'w').close()

print("Separation of validation images completed.")'''

# Define dataset configuration
dataset_config = {
    'train': train_image_dir,
    'val': val_image_dir ,  # Use non_annotated_images for validation, changed just using the whole dataset as it is
    'test': test_image_dir,
    'nc': 2,
    'names': ['dent','dummy']
}

# Write dataset configuration to a yaml file
dataset_config_file = 'main.yaml'

with open(dataset_config_file, 'w') as file:
    yaml.dump(dataset_config, file, default_flow_style=False)

# Check if the dataset configuration file exists
if not os.path.exists(dataset_config_file):
    print(f"Dataset configuration file {dataset_config_file} does not exist.")
    exit(1)
print("Dataset configuration file absolute path:", os.path.abspath(dataset_config_file))

try:
    # Initialize the YOLO model
    model = YOLO('yolov5s.pt')

    # Train the model using the dataset configuration file
    model.train(data=dataset_config_file, epochs=10, imgsz=640, batch=16, project='runs/train/my_dent_detection_experiment', name='yolov5s_results')

    # Validate the model using non-annotated images
    val_results = model.val(data=dataset_config_file, split='val')
    print('Validation Results:', val_results)

    # Test the model
    test_results = model.val(data=dataset_config_file, split='test')
    print('Test Results:', test_results)

except Exception as e:
    print('Something went wrong:', e)
    print('Detailed error:', e.__class__.__name__, str(e))
