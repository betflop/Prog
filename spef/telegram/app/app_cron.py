# !/usr/bin/env python
# pylint: disable=unused-argument, wrong-import-position
# This program is dedicated to the public domain under the CC0 license.


import time
from datetime import datetime, timedelta
# import random

from sqlalchemy import create_engine
import logging

from telegram import __version__ as TG_VER

try:
    from telegram import __version_info__
except ImportError:
    __version_info__ = (0, 0, 0, 0, 0)  # type: ignore[assignment]

if __version_info__ < (20, 0, 0, "alpha", 1):
    raise RuntimeError(
        f"This example is not compatible with your current PTB version {TG_VER}. To view the "
        f"{TG_VER} version of this example, "
        f"visit https://docs.python-telegram-bot.org/en/v{TG_VER}/examples.html"
    )
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, InputMediaPhoto
from telegram.ext import Application, CallbackQueryHandler, CommandHandler, ContextTypes
from telegram.ext import CallbackContext, JobQueue, MessageHandler, filters
from telegram.ext.filters import MessageFilter
import pathlib
from pathlib import Path
import re
import uuid
import os
import base64

db_name = 'telegram'
db_user = 'tgbot'
db_pass = 'tgbot'
db_host = 'pgsql-server'
# db_host = '127.0.0.1'
db_port = '5432'

# Connecto to the database
db_string = 'postgresql://{}:{}@{}:{}/{}'.format(db_user, db_pass, db_host, db_port, db_name)
db = create_engine(db_string)


# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

async def stats(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    fstats = find_stat(update.message.from_user.id)

    await update.message.reply_text("📊 Статистика по темам:")
    strstats = ""
    for i in fstats:
        strstats = ""
        strstats += "{:<15}\nA:{}, B:{}, C:{}, D:{}, E:{}, F:{}, G:{}\nReady:{}\n".format(i[0],i[7], i[6], i[5], i[4], i[3], i[2], i[1], i[8])
        await update.message.reply_text(strstats)

def find_stat(user_id):
    query = """
select q.tag1,
sum(case when coalesce(p.level, 1) = 1 then 1 else 0 end) as l_g,
sum(case when coalesce(p.level, 1) = 2 then 1 else 0 end) as l_f,
sum(case when coalesce(p.level, 1) = 3 then 1 else 0 end) as l_e,
sum(case when coalesce(p.level, 1) = 4 then 1 else 0 end) as l_d,
sum(case when coalesce(p.level, 1) = 5 then 1 else 0 end) as l_c,
sum(case when coalesce(p.level, 1) = 6 then 1 else 0 end) as l_b,
sum(case when coalesce(p.level, 1) = 7 then 1 else 0 end) as l_a,
sum(case when (p.repeat_date <= %s or p.repeat_date is null) then 1 else 0 end) as ready
from public.questions as q
left join public.practice as p
on q.id = p.question_id
and q.user_id = p.user_id
where q.user_id = %s
group by(q.tag1);
    """
    result = []
    result_set = db.execute(query, (datetime.now().strftime('%Y-%m-%d %H:%M:%S'), user_id, ))
    for (r) in result_set:
        result.append([r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8]])
    return result

async def send_stats():
    application = Application.builder().token("5303765484:AAF6fT42ZRHhV20GvlIJlrr48rWo-30RzT4").build()
    fstats = find_stat(update.message.from_user.id)
    strstats = ""
    for i in fstats:
        strstats = ""
        strstats += "Ready to repeat: *{:<15}*\n{}\n".format(i[0], i[8])
 
    await application.bot.send_message(chat_id=214965949, text='Hello world')

import asyncio
asyncio.run(send_stats())
