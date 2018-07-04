#!/usr/bin/env python

import time

import RPi.GPIO as GPIO


def firethisbitch():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(17, GPIO.OUT)
    GPIO.output(17, GPIO.LOW)

    time.sleep(0.25)

    GPIO.output(17, GPIO.HIGH)
    GPIO.cleanup()