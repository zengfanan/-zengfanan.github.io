@echo off
echo 1:grunt,2:grunt jsdo,3:grunt cssdo

set /p a=«Î ‰»Î ‰»Î:
if /i %a%==1 grunt
if /i %a%==2 grunt jsdo
if /i %a%==3 grunt cssdo

pause