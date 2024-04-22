import cv2
import numpy as np
import utils
# import sys
import argparse

from fastapi import FastAPI


app = FastAPI()

POSTS = [
    {
        'id': 1,
        'title': 'Post 1'
    },
    {
        'id': 2,
        'title': 'Post 2'
    },
    {
        'id': 3,
        'title': 'Post 3'
    },
]

@app.get('/')
async def get_all_posts():
    return POSTS

@app.get('/{id}')
async def get_one_post(id:int):
    post = [post for post in POSTS if post['id'] == id]
    return post[0]
