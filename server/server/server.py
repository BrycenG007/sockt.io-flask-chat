from flask import Flask
from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'development key'
socket = SocketIO(app)
CORS(app)


@socket.on('connect')
def on_connect():
    print('user connected')
    retrieve_active_users()


def retrieve_active_users():
    emit('retrieve_active_users', broadcast=True)


@socket.on('activate_user')
def on_active_user(data):
    user = data.get('username')
    emit('user_activated', {'user': user}, broadcast=True)


@socket.on('deactivate_user')
def on_inactive_user(data):
    user = data.get('username')
    emit('user_deactivated', {'user': user}, broadcast=True)


@socket.on('join_room')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('open_room', {'room': room}, broadcast=True)


@socket.on('send_message')
def on_chat_sent(data):
    room = data['room']
    emit('message_sent', data, room=room)
