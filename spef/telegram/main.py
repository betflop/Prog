# !/usr/bin/env python
# pylint: disable=unused-argument, wrong-import-position
# This program is dedicated to the public domain under the CC0 license.


from datetime import datetime, timedelta
from sqlalchemy import create_engine
import logging
import base64

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
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CallbackQueryHandler, CommandHandler, ContextTypes
from telegram.ext import MessageHandler, filters
from pathlib import Path
import re
import uuid
import os

db_name = 'spef'
db_user = 'admin'
db_pass = 'admin'
db_host = 'localhost'
db_port = '5430'

# Connecto to the database
db_string = 'postgresql://{}:{}@{}:{}/{}'.format(
    db_user, db_pass, db_host, db_port, db_name)
db = create_engine(db_string)

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)


def add_new_row(user_id, last_request):
    # Insert a new number into the 'numbers' table.
    db.execute("INSERT INTO history (user_id,last_request,last_date) VALUES ({}, {}, {})".format(
        str(user_id), "'"+last_request+"'", "'"+datetime.today().strftime('%Y-%m-%d %H:%M:%S')+"'"))

    query = "SELECT last_date FROM history LIMIT 1"
    result_set = db.execute(query)

    for (r) in result_set:
        date = print(r)
        result = datetime.today() + timedelta(days=3)

    db.execute("INSERT INTO history (user_id,last_request,last_date) VALUES ({}, {}, {})".format(
        str(user_id), "'"+last_request+"'", "'"+result.strftime('%Y-%m-%d %H:%M:%S')+"'"))


def add_new_question(user_id, question, answer_img, tags):
    # Insert a new number into the 'numbers' table.
    db.execute("INSERT INTO questions (user_id, question, answer_img, tag1, tag2, tag3, common) VALUES ({}, {}, {}, {}, {}, {}, {})".format(str(
        user_id), "'"+question.replace("\\", "").replace("'", "")+"'", "'"+answer_img+"'", "'"+tags[0]+"'", "'"+tags[1]+"'", "'"+tags[2]+"'", False))


def get_all_tags(user_id):
    # Retrieve the last number inserted inside the 'numbers'
    query = "SELECT DISTINCT tag1 FROM questions WHERE user_id = %s"

    tags = []
    result_set = db.execute(query, (user_id, ))
    for (r) in result_set:
        tags.append(r[0])
    return tags


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    tags = find_stat(update.message.from_user.id)
    keyboard = []
    currentline = []
    for tag in tags:
        currentline.append(InlineKeyboardButton("{} {}".format(
            tag[0], tag[8]), callback_data="tag_{}".format(tag[0])))
        if len(currentline) % 2 == 0:
            keyboard.append(currentline)
            currentline = []
    keyboard.append(currentline)
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text("📚 Выберите тему:", reply_markup=reply_markup, parse_mode="HTML")


async def stats(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    fstats = find_stat(update.message.from_user.id)

    await update.message.reply_text("📊 Статистика по темам:")
    strstats = ""
    for i in fstats:
        strstats = ""
        strstats += "{:<15}\nA:{}, B:{}, C:{}, D:{}, E:{}, F:{}, G:{}\nReady:{}\n".format(
            i[0], i[7], i[6], i[5], i[4], i[3], i[2], i[1], i[8])
        await update.message.reply_text(strstats)


async def create(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends a message with three inline buttons attached."""
    await update.message.reply_text("Для создания карточки пришлите текст или фото и укажите тему в виде хештега\nПример:\nНазовите уровни OSI\n||Физический||\n||Канальный||\n#Network")


def find_question(user_id, tag):
    # Retrieve the last number inserted inside the 'numbers'
    query = """
    SELECT q.id, q.question, coalesce(p.level, 1) as level, p.repeat_date, q.answer_img
    FROM questions as q LEFT JOIN practice as p
    ON q.id = p.question_id and q.user_id = p.user_id
    WHERE q.tag1 = %s
    and q.user_id = %s
    and (p.repeat_date <= %s or p.repeat_date is null)
    ORDER BY
    p.repeat_date nulls FIRST
    LIMIT 1
    """

    result = []
    result_set = db.execute(
        query, (tag, user_id, datetime.now().strftime('%Y-%m-%d %H:%M:%S'), ))
    for (r) in result_set:
        result.append([r[0], r[1], r[2], r[3], r[4]])
    return result


def find_img(user_id, q_id):
    # Retrieve the last number inserted inside the 'numbers'
    query = """
    SELECT q.id, q.answer_img
    FROM questions as q
    WHERE q.user_id = %s
    and q.id = %s
    LIMIT 1
    """

    result = []
    result_set = db.execute(query, (user_id, q_id, ))
    for (r) in result_set:
        result.append([r[0], r[1]])
    return result


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
    result_set = db.execute(
        query, (datetime.now().strftime('%Y-%m-%d %H:%M:%S'), user_id, ))
    for (r) in result_set:
        result.append([r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8]])
    return result


def delete_query(user_id, q_id):
    # Insert a new number into the 'numbers' table.
    db.execute("DELETE FROM public.practice WHERE question_id = {} and user_id = {}".format(
        q_id, user_id))
    db.execute("DELETE FROM public.questions WHERE id = {} and user_id = {}".format(
        q_id, user_id))


def update_practice(user_id, q_id, q_level):
    day = 45
    if q_level == 1:
        day = 1
    elif q_level == 2:
        day = 2
    elif q_level == 3:
        day = 4
    elif q_level == 4:
        day = 8
    elif q_level == 5:
        day = 16
    elif q_level == 6:
        day = 32
    else:
        day = 64

    # repeat_date = datetime.now() + timedelta(days=day)
    repeat_date = datetime.utcnow().date() + timedelta(days=day)
    repeat_date = repeat_date.strftime('%Y-%m-%d %H:%M:%S')
    practice_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    # Insert a new number into the 'numbers' table.
    db.execute("INSERT INTO public.practice(question_id, user_id, level, practice_date, repeat_date) VALUES ({}, {}, {}, {}, {}) ON CONFLICT (question_id, user_id) DO UPDATE SET level = {}, practice_date = {}, repeat_date = {};".format(
        q_id, user_id, q_level, "'"+practice_date+"'", "'"+repeat_date+"'", q_level, "'"+practice_date+"'", "'"+repeat_date+"'"))


def stripstring(question):
    return question


async def button(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Parses the CallbackQuery and updates the message text."""
    query = update.callback_query

    # CallbackQueries need to be answered, even if no notification to the user is needed
    # Some clients may have trouble otherwise. See https://core.telegram.org/bots/api#callbackquery
    await query.answer()

    command = query.data.split("_")[0]
    if command == "tag":
        answer = "Выбранная тема <b>{}</b>".format(query.data.split("_")[1])
        question = find_question(query.from_user.id, query.data.split("_")[1])
        if len(question) == 0:
            await query.message.reply_text("☕ Вопросы закончились...\nМожно попить кофе!")
            return
        keyboard = [
            [InlineKeyboardButton("Flip", callback_data="Flip_{}_{}_{}_{}".format(
                query.data.split("_")[1], question[0][0], question[0][2], len(question[0][4])))],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        print('___________________________Выбран вопрос id:{}_________________________'.format(
            question[0][0]))
        await query.edit_message_text(text=answer, parse_mode="HTML")
        await query.message.reply_text("{}".format(stripstring(question[0][1])), reply_markup=reply_markup, parse_mode="HTML")
    elif command == "Flip":
        q_tag = query.data.split("_")[1]
        q_id = query.data.split("_")[2]
        q_level = query.data.split("_")[3]
        q_img = query.data.split("_")[4]
        if q_img != "0":
            q_img = find_img(query.from_user.id, q_id)[0][1]

        keyboard = [
            [InlineKeyboardButton("❌Del", callback_data="answer_{}_{}_{}_d".format(q_tag, q_id, q_level)),
             InlineKeyboardButton(
                 "😔Hard", callback_data="answer_{}_{}_{}_1".format(q_tag, q_id, q_level)),
             InlineKeyboardButton(
                 "🤷‍♂️Good", callback_data="answer_{}_{}_{}_2".format(q_tag, q_id, q_level)),
             InlineKeyboardButton("😄Easy", callback_data="answer_{}_{}_{}_3".format(q_tag, q_id, q_level))],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)

        text = query.message.text_html.replace(
            '<span class="tg-spoiler">', '').replace('</span>', '')
        striptext = query.message.text
        for i in re.findall('<.+?\n?.+?>', striptext):
            newi = i.replace("<", "").replace(">", "")
            text = text.replace(i, "&lt;{}&gt;".format(newi))

        if q_img == "0" or len(q_img) == 0:

            await query.edit_message_text(text="{}".format(text), reply_markup=reply_markup, parse_mode="HTML")
        else:
            await query.edit_message_text(text=text, parse_mode="HTML")
            await query.message.reply_photo(photo=open(q_img, 'rb'), caption="-------------------", reply_markup=reply_markup, parse_mode="HTML")

    elif command == "answer":
        q_level = 1
        delete = False

        if query.data.split("_")[4] == "1":
            q_level = 1
            await query.message.reply_text("Без комментариев 🤬 ")
        elif query.data.split("_")[4] == "2":
            q_level = max(1, int(query.data.split("_")[3]) - 1)
            await query.message.reply_text("Так держать 👍 ")
        elif query.data.split("_")[4] == "3":
            q_level = min(7, int(query.data.split("_")[3]) + 1)
            await query.message.reply_text("Красава ❤️‍🔥 ")
        elif query.data.split("_")[4] == "d":
            delete = True
            delete_query(query.from_user.id, query.data.split("_")[2])
            await query.message.edit_reply_markup()

        if not delete:
            update_practice(query.from_user.id,
                            query.data.split("_")[2], q_level)
            if query.message.caption == None:
                await query.edit_message_text(text="{}".format(query.message.text_html.replace("||", "")), parse_mode="HTML")
            else:
                await query.message.edit_reply_markup()

        question = find_question(query.from_user.id, query.data.split("_")[1])
        if len(question) == 0:
            await query.message.reply_text("☕ Вопросы закончились...\nМожно попить кофе!")
            return

        keyboard = [
            [InlineKeyboardButton("Flip", callback_data="Flip_{}_{}_{}_{}".format(
                query.data.split("_")[1], question[0][0], question[0][2], len(question[0][4])))],
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await query.message.reply_text("{}".format(stripstring(question[0][1])), reply_markup=reply_markup, parse_mode="HTML")


async def request_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Displays info on how to use the bot."""

    text = update.message.text_html
    if text == None:
        text = update.message.caption_html
    if text == None:
        text = update.message.text
    if len(text) == 0:
        return
    striptext = update.message.text
    if striptext == None:
        striptext = update.message.caption
    if striptext == None:
        await update.message.reply_text("Ошибка обработки сообщения...\nНе найден текст")
        return

    for i in re.findall('<.+?\n?.+?>', striptext):
        newi = i.replace("<", "").replace(">", "")
        text = text.replace(i, "&lt;{}&gt;".format(newi))

    laststr = text.split("\n")[-1]
    hashtags = re.findall(r"#(\w+)", laststr)

    if len(hashtags) == 0:
        await update.message.reply_text("Для добавления новой карточки необходимо указать хотя бы один хештег")
        return
    elif len(hashtags) == 1:
        hashtags.append('')
        hashtags.append('')
    elif len(hashtags) == 2:
        hashtags.append('')

    text = text.replace(laststr, '')
    user_id = update.message.from_user.id
    lenPhoto = len(update.message.photo)
    answer_img = []
    if lenPhoto > 0:
        pth = "./img/{}/{}".format(user_id, hashtags[0])
        Path("{}".format(pth)).mkdir(parents=True, exist_ok=True)
        photo_file = await update.message.photo[-1].get_file()
        filename, file_extension = os.path.splitext(photo_file.file_path)
        answer_img.append(
            "{}/{}{}".format(pth, uuid.uuid4().hex, file_extension))
        # await photo_file.download(answer_img[-1])

        # Download the file
        file_content = await photo_file.download(answer_img[-1])
        # Convert the file to Base64
        file_base64 = base64.b64encode(file_content).decode('utf-8')
        print(file_base64)
    elif update.message.document != None:
        pth = "./img/{}/{}".format(user_id, hashtags[0])
        Path("{}".format(pth)).mkdir(parents=True, exist_ok=True)
        photo_file = await update.message.document.get_file()
        filename, file_extension = os.path.splitext(
            update.message.document.file_name)
        answer_img.append(
            "{}/{}{}".format(pth, uuid.uuid4().hex, file_extension))
        await photo_file.download(answer_img[-1])

    # add_new_question(user_id, text, ",".join(answer_img), hashtags)
    await update.message.reply_text("Новая карточка создана!")


def main() -> None:
    """Run the bot."""
    # Create the Application and pass it your bot's token.
    application = Application.builder().token(
        "5303765484:AAF6fT42ZRHhV20GvlIJlrr48rWo-30RzT4").build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("create", create))
    application.add_handler(CommandHandler("stats", stats))
    application.add_handler(CallbackQueryHandler(button))
    application.add_handler(MessageHandler(filters.ALL, request_message))

    # Run the bot until the user presses Ctrl-C
    application.run_polling()


if __name__ == "__main__":
    main()
