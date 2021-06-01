from selenium import webdriver
from selenium.webdriver.common import keys
from selenium.webdriver.common.keys import Keys
import time
import json

my_json = open('./testcase.json', 'r')
json_data = my_json.read()

obj = json.loads(json_data)

PATH = "C:\chromedriver\chromedriver.exe"
web = webdriver.Chrome(PATH)
web.get("https://praktikum-pwl-selenium.herokuapp.com/")

nama_input = web.find_element_by_id('name')
username_input = web.find_element_by_id('username')
password_input = web.find_element_by_id('password')
repassword_input = web.find_element_by_id('repassword')
submit = web.find_element_by_name('register')

for i in obj:
    nama_input.clear()
    nama_input.send_keys(i['data']['name'])
    time.sleep(3)
    username_input.clear()
    username_input.send_keys(i['data']['username'])
    time.sleep(3)
    password_input.clear()
    password_input.send_keys(i['data']['password'])
    time.sleep(5)
    repassword_input.clear()
    repassword_input.send_keys(i['data']['repassword'])
    time.sleep(5)
    submit.click()

web.quit()