from telegram.ext import Updater, CommandHandler, CallbackContext, CallbackQueryHandler
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Application, CommandHandler
import proxmoxer
from pydantic import BaseModel
import logging
from starlette.config import Config
import asyncio
# logging.basicConfig(level=logging.DEBUG)

confenv = Config(".env")


# Define the configuration data for the ProxmoxVM object
config_data = {
    "hostname": f'{confenv.get("PVE_URL")}',
    "username": f'{confenv.get("PVE_USERNAME")}',
    "password": f'{confenv.get("PVE_PASSWORD")}',
    "node": f'{confenv.get("PVE_NODE")}',
}


class ProxmoxVMConfig(BaseModel):
    hostname: str
    username: str
    password: str
    node: str


class ProxmoxVM:
    def __init__(self, config: ProxmoxVMConfig, vm_ids: list[str]):
        self.proxmox = proxmoxer.ProxmoxAPI(
            config.hostname,
            user=config.username,
            password=config.password,
            verify_ssl=False,  # set to False if you do not have a valid cert for your Proxmox server
        )
        self.vms = [self.proxmox.nodes(config.node).qemu(vm_id)
                    for vm_id in vm_ids]

    def start(self):
        for vm in self.vms:
            vm.status.post("start")

    def resume(self):
        for vm in self.vms:
            vm.status.post("resume")

    def shutdown(self):
        for vm in self.vms:
            vm.status.post("shutdown")

    def pause(self):
        for vm in self.vms:
            vm.status.post("suspend")

    def status(self):
        for vm in self.vms:
            status_dict = vm.status.current.get()
            print(f"VM {vm.vmid} is {status_dict}")


# Create a ProxmoxVMConfig object from the configuration data
config = ProxmoxVMConfig(**config_data)
# Create a ProxmoxVM object for VMs 110, 111, and 112
vm = ProxmoxVM(config, confenv.get("PVE_VMS").split(","))


async def start(update: Update, context: CallbackContext, vm) -> None:
    keyboard = [
        [InlineKeyboardButton("Pause", callback_data='pause'),
         InlineKeyboardButton("Resume", callback_data='resume')],
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)

    # print(vm.dict())
    for nd in vm.vms:
        await update.message.reply_text(
            f"VM {nd.status.current.get()['vmid']} is {nd.status.current.get()['qmpstatus']}",
        )
    await update.message.reply_text('Please choose:', reply_markup=reply_markup)


async def button(update: Update, context: CallbackContext, vm) -> None:

    print('button')
    query = update.callback_query

    await query.answer()

    await query.edit_message_text(text=f"Selected option: {query.data}")
    if query.data == 'pause':
        vm.pause()
    elif query.data == 'resume':
        vm.resume()


def main() -> None:
    # update_queue = asyncio.Queue()
    # updater = Updater(confenv.get("TELEGRAM_TOKEN"), update_queue=update_queue)

    application = Application.builder().token(
        confenv.get("TELEGRAM_TOKEN")).build()
    # Commands
    # application.add_handler(CommandHandler('start', start))

    application.add_handler(CommandHandler(
        'start', lambda update, context: start(update, context, vm)))

    application.add_handler(CallbackQueryHandler(
        lambda update, context: button(update, context, vm)))

    # Run bot
    application.run_polling(1.0)
    # updater.add_handler(CommandHandler('start', start))
    # updater.add_handler(CallbackQueryHandler(button))

    # updater.start_polling()

    # updater.idle()


if __name__ == '__main__':
    main()


# vm.start()

# vm.pause()
# vm.resume()
# shutdown the instance
# vm.shutdown()
# start the instance
# vm.start()
