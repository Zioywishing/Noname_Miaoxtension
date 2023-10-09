# 导入os模块，用于操作文件和目录
import os
from time import sleep
# 定义一个函数，接受一个文件名作为参数，返回修改后的内容

def modify_file(filename):
    # 打开文件，以只读模式
    with open(filename, 'r', encoding='UTF-8') as f:
        # 读取文件的所有行，存入一个列表
        lines = f.readlines()
    # 创建一个空列表，用于存储修改后的行
    new_lines = []
    num = 0
    # 遍历每一行
    for line in lines:
        if '"step 0";' in line:
            line = line.replace('"step 0";', '"step 0"')
            num+=1
        if '("step 1");' in line:
            line = line.replace('("step 1");', '"step 1"')
            num+=1
        if '("step 2");' in line:
            line = line.replace('("step 2");', '"step 2"')
            num+=1
        if '("step 3");' in line:
            line = line.replace('("step 3");', '"step 3"')
            num+=1
        if '("step 4");' in line:
            line = line.replace('("step 4");', '"step 4"')
            num+=1
        if '("step 5");' in line:
            line = line.replace('("step 5");', '"step 5"')
            num+=1
        if '("step 6");' in line:
            line = line.replace('("step 6");', '"step 6"')
            num+=1
        if '("step 7");' in line:
            line = line.replace('("step 7");', '"step 7"')
            num+=1
        if '("step 8");' in line:
            line = line.replace('("step 8");', '"step 8"')
            num+=1
        if '("step 9");' in line:
            line = line.replace('("step 9");', '"step 9"')
            num+=1
        if '("step 10");' in line:
            line = line.replace('("step 10");', '"step 10"')
            num+=1
        print(line)
        # 将修改后的行添加到新列表中
        new_lines.append(line)
    # 返回新列表中的所有行，用换行符连接
    print("Successfully fixed " + str(num) +" code errors")
    return ''.join(new_lines)

# 获取当前目录下的所有文件和子目录
flag = False
files = os.listdir('.')
# 遍历每一个文件或子目录
for file in files:
    # 如果是文件，并且文件名是extension.js
    if os.path.isfile(file) and file == 'extension.js':
        # 调用函数，传入文件名，得到修改后的内容
        content = modify_file(file)
        # 打开文件，以写入模式，覆盖原内容
        with open(file, 'w', encoding='UTF-8') as f:
            # 写入修改后的内容
            f.write(content)
        flag = True
    if os.path.isfile(file) and file == 'game.js':
        # 调用函数，传入文件名，得到修改后的内容
        content = modify_file(file)
        # 打开文件，以写入模式，覆盖原内容
        with open(file, 'w', encoding='UTF-8') as f:
            # 写入修改后的内容
            f.write(content)
        flag = True

if flag:
    pass
else:
    print('ERROR')
sleep(3)
