fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'

name 'ag-hud'
version '0.2.0'
description 'HUD for FiveM'
author 'Agnarz'
repository 'https://github.com/Agnarz/ag-hud'

shared_script '@ox_lib/init.lua'
client_script 'client.lua'
server_script 'server.lua'

ui_page 'web/build/index.html'

files {
  'web/build/index.html',
  'web/build/**/*',
}
