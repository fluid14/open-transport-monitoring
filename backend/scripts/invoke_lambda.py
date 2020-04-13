#!/usr/bin/env python
import os
import subprocess
import sys
import getopt
import re
import bios

# CONSTANTS
LAYERS_PATH = os.path.join('..', 'layers')
LAYER_SRC_DIR = 'src'
FUNCTION_INPUT_FILE = 'input.json'
FUNCTION_ENV_FILE = 'env.yml'


def get_layer_modules_paths(layers_path):
    paths_string = ''
    for (root, dirs, files) in os.walk(layers_path):
        if LAYER_SRC_DIR in dirs:
            abs_src_path = os.path.abspath('{}/{}'.format(root, LAYER_SRC_DIR))
            paths_string += '{}:'.format(abs_src_path)

    return paths_string


def get_function_dir(function_name):
    dir_words = re.split('(?=[A-Z])', function_name) # Split name by uppercases
    dir_lowered_words = map(lambda word: word.lower(), dir_words)
    dir_joined_lowered_words = '_'.join(dir_lowered_words)

    return dir_joined_lowered_words


def get_function_env(function_env_path):
    if not os.path.exists(function_env_path):
        return ''

    env = bios.read(function_env_path, file_type='yaml')
    env_string = ''

    for key in env:
        env_string += '-e {}={} '.format(key, env[key])

    return env_string


def get_function_input(function_dir, function_input_path):
    if not os.path.exists(function_input_path):
        return ''

    input_string = '-p {}/{}'.format(function_dir, FUNCTION_INPUT_FILE)
    return input_string


def invoke_lambda(function, service):
    function_dir = get_function_dir(function)
    function_input_path = os.path.join('..', service, function_dir, FUNCTION_INPUT_FILE)
    function_env_path = os.path.join('..', service, function_dir, FUNCTION_ENV_FILE)

    function_input = get_function_input(function_dir, function_input_path)
    env_vars = get_function_env(function_env_path)

    os.environ['PYTHONPATH'] = get_layer_modules_paths(LAYERS_PATH)
    serverless_run_cmd = 'sls invoke local -f {} {} {}'.format(function, function_input, env_vars)

    process = subprocess.Popen(serverless_run_cmd.split(), cwd=os.path.join('..', service), stdout=subprocess.PIPE)
    return process.communicate()


def format_lambda_ouput(output):
    decoded_ouput = output.decode("utf-8")

    try:
        # Try to remove serverless enterprise log
        without_serverless_log = decoded_ouput.split('SERVERLESS_ENTERPRISE')
        before_serverless = without_serverless_log[0]
        after_serverless_index = without_serverless_log[1].index('\n')
        after_serverless = without_serverless_log[1][after_serverless_index:]

        return before_serverless + after_serverless
    except IndexError:
        return decoded_ouput


def main(argv):
    function = ''
    service = ''

    opts, args = getopt.getopt(argv, 'f:s:')

    for opt, arg in opts:
        if opt == '-f':
            function = arg
        elif opt == '-s':
            service = arg

    output, error = invoke_lambda(function, service)

    if not error:
        print(format_lambda_ouput(output))
    else:
        print(error)


if __name__ == "__main__":
    main(sys.argv[1:])
