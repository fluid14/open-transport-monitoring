#!/usr/bin/python

import sys
import subprocess

from shutil import copy, make_archive, rmtree
from os import listdir, makedirs, path

# Name of directory with source files
layer_source_dir = 'src'

# Get arguments from invocation
layer_dir = sys.argv[1]
artifact_local_path = sys.argv[2].replace('.zip', '')
environment = sys.argv[3]

# Path to save artifact
artifact_path = path.join(layer_dir, artifact_local_path, 'python/lib', environment, 'site-packages')
# Path to layer source files
source_path = path.join(layer_dir, layer_source_dir)
# Path to temporary package structure
main_package_path = path.join(layer_dir, artifact_local_path)

# List layer source files
source_files = listdir(source_path)

# Create temporary package structure
makedirs(artifact_path, exist_ok=True)

requirements_file = path.join(layer_dir, 'requirements.txt')

if path.exists(requirements_file):
    subprocess.check_call([
        sys.executable,
        "-m",
        "pip",
        "--no-cache-dir",
        "install",
        "-r",
        requirements_file,
        "-t",
        artifact_path
    ])

# Copy source files to temporary package structure
for file in (f for f in source_files if path.isfile(path.join(source_path, f))):
    copy(
        path.join(source_path, file),
        path.join(artifact_path, file)
    )

# Create zip package
make_archive(main_package_path, 'zip', main_package_path)

# Remove temporary structure
rmtree(main_package_path)

