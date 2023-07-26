@echo off

REM Inspired by https://stackoverflow.com/a/11995662/98903
net session >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Please re-run in elevated mode.
    exit /b 1
)

echo Turn Off Require Sign-in on Wakeup (when plugged in)
REM https://www.tenforums.com/tutorials/11129-turn-off-require-sign-wakeup-windows-10-a.html
powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_NONE CONSOLELOCK 0

echo Enable hibernation
REM https://www.windowscentral.com/how-use-powercfg-control-power-settings-windows-10
powercfg /hibernate on

echo Create a Custom Power scheme and set it as active
REM https://ss64.com/nt/powercfg.html
Set _Custom_Power=050FA492-B608-411A-9345-CDF1BA46634B
Powercfg /DUPLICATESCHEME SCHEME_MAX %_Custom_Power%
Powercfg /CHANGENAME %_Custom_Power% "Dashboard"
echo:
echo Set the hibernate timeout for the current scheme
Powercfg /Change -hibernate-timeout-ac 30


REM /SetacValueIndex Scheme_GUID Sub_GUID Setting_GUID SettingIndex

REM                                       Hard disk                            Turn off hard disk after             Seconds (5 minutes)
Powercfg /SetacValueIndex %_Custom_Power% 0012ee47-9041-4b5d-9b77-535fba8b1442 6738e2c4-e8a5-4a42-b16a-e040e769756e 300


REM                                       Internet Explorer                    JavaScript Timer Frequency           Maximum Power Savings
Powercfg /SetacValueIndex %_Custom_Power% 02f815b5-a5cf-4c84-bf20-649d1f75d3d8 4c793e7d-a264-42e1-87d3-7a0d2f523ccd 000


REM                                       Desktop background settings          Slide show                           Available
Powercfg /SetacValueIndex %_Custom_Power% 0d7dbae2-4294-402a-ba8e-26777e8488cd 309dce9b-bef4-4119-9921-a851fb12f0f4 000


REM                                       Wireless Adapter Settings            Power Saving Mode                    Maximum Power Saving
Powercfg /SetacValueIndex %_Custom_Power% 19cbb8fa-5279-450e-9fac-8a3d5fedd0c1 12bbebe6-58d6-4636-95bb-3217ef867c1a 003


REM                                       Sleep                                Sleep after                          Seconds (20 minutes)
Powercfg /SetacValueIndex %_Custom_Power% 238c9fa8-0aad-41ed-83f4-97be242c8f20 29f6c1db-86da-48c5-9fdb-f2b67b1f44da 1200

REM                                       Sleep                                Allow hybrid sleep                   On
Powercfg /SetacValueIndex %_Custom_Power% 238c9fa8-0aad-41ed-83f4-97be242c8f20 94ac6d29-73ce-41a6-809f-6363ba21b47e 001

REM                                       Sleep                                Allow wake timers                    Enable
Powercfg /SetacValueIndex %_Custom_Power% 238c9fa8-0aad-41ed-83f4-97be242c8f20 bd3b718a-0680-4d9d-8ab2-e1d2b4ac806d 001


REM                                       USB settings                         USB selective suspend setting        Enabled
Powercfg /SetacValueIndex %_Custom_Power% 2a737441-1930-4402-8d77-b2bebba308a3 bd3b718a-0680-4d9d-8ab2-e1d2b4ac806d 001


REM                                       Intel(R) Graphics Settings           Intel(R) Graphics Power Plan         Maximum Battery Life
Powercfg /SetacValueIndex %_Custom_Power% 44f3beca-a7c0-460e-9df2-bb8b99e0cba6 3619c3f2-afb2-4afc-b0e9-e7fef372de36 000


REM                                       Power buttons and lid                Start menu power button              Hibernate
Powercfg /SetacValueIndex %_Custom_Power% 4f971e89-eebd-4455-a8de-9e59040e7347 a7066653-8d6c-40a8-910e-a1f54b84c7e5 001


REM                                       PCI Express                          Link State Power Management          Maximum power savings
Powercfg /SetacValueIndex %_Custom_Power% 501a4d13-42af-4429-9fd1-a8218c268e20 ee12f906-d277-404b-b6da-e5fa1a576df5 002


REM                                       Processor power management           Minimum processor state              %
Powercfg /SetacValueIndex %_Custom_Power% 54533251-82be-4824-96c1-47b60b740d00 893dee8e-2bef-41e0-89c6-b55d0929964c 5

REM                                       Processor power management           System cooling policy                Passive
Powercfg /SetacValueIndex %_Custom_Power% 54533251-82be-4824-96c1-47b60b740d00 94d3a615-a899-4ac5-ae2b-e4d8f634367f 000

REM                                       Processor power management           Maximum processor state              %
Powercfg /SetacValueIndex %_Custom_Power% 54533251-82be-4824-96c1-47b60b740d00 bc5038f7-23e0-4960-96da-33abaf5935ec 100


REM                                       Display                              Turn off display after               Seconds (20 minutes)
Powercfg /SetacValueIndex %_Custom_Power% 7516b95f-f776-4464-8c53-06167f40cc99 3c0bc021-c8a8-4e07-a973-6b14cbcb2b7e 1200

REM                                       Display                              Display brightness                   %
Powercfg /SetacValueIndex %_Custom_Power% 7516b95f-f776-4464-8c53-06167f40cc99 aded5e82-b909-4619-9949-f5d71dac0bcb 50

REM                                       Display                              Dimmed display brightness            %
Powercfg /SetacValueIndex %_Custom_Power% 7516b95f-f776-4464-8c53-06167f40cc99 f1fbfde2-a960-4165-9f88-50667911ce96 25

REM                                       Display                              Enable adaptive brightness           On
Powercfg /SetacValueIndex %_Custom_Power% 7516b95f-f776-4464-8c53-06167f40cc99 fbd9aa66-9553-4097-ba44-ed6e9d65eab8 001


REM                                       Multimedia settings                  When sharing media                   Prevent idling to sleep
Powercfg /SetacValueIndex %_Custom_Power% 9596fb26-9850-41fd-ac3e-f7c3c00afd4b 03680956-93bc-4294-bba6-4e0f09bb717f 001

REM                                       Multimedia settings                  Video playback quality bias          Video playback power-saving bias
Powercfg /SetacValueIndex %_Custom_Power% 9596fb26-9850-41fd-ac3e-f7c3c00afd4b 10778347-1370-4ee0-8bbd-33bdacaade49 000

REM                                       Multimedia settings                  When playing video                   Optimize power savings
Powercfg /SetacValueIndex %_Custom_Power% 9596fb26-9850-41fd-ac3e-f7c3c00afd4b 34c7b99f-9a6d-4b3c-8dc7-b6693b78cef4 002


REM                                       Battery                              Critical battery notification        Off
Powercfg /SetacValueIndex %_Custom_Power% e73a048d-bf27-4f12-9731-8b2076e8891f 5dbb7c9f-38e9-40d2-9749-4f8a0e9f640f 000

REM                                       Battery                              Critical battery action              Do nothing
Powercfg /SetacValueIndex %_Custom_Power% e73a048d-bf27-4f12-9731-8b2076e8891f 637ea02f-bbcb-4015-8e2c-a1c7b9c0b546 000

REM                                       Battery                              Low battery level                    %
Powercfg /SetacValueIndex %_Custom_Power% e73a048d-bf27-4f12-9731-8b2076e8891f 8183ba9a-e910-48da-8769-14ae6dc1170a 010

REM                                       Battery                              Critical battery level               %
Powercfg /SetacValueIndex %_Custom_Power% e73a048d-bf27-4f12-9731-8b2076e8891f 9a66d8d7-4ff7-4ef9-b5a2-5a326ca2a469 005

REM                                       Battery                              Low battery notification             Off
Powercfg /SetacValueIndex %_Custom_Power% e73a048d-bf27-4f12-9731-8b2076e8891f bcded951-187b-4d05-bccc-f7e51960c258 000

REM                                       Battery                              Low battery action                   Do nothing
Powercfg /SetacValueIndex %_Custom_Power% e73a048d-bf27-4f12-9731-8b2076e8891f d8742dcb-3e6a-4b3c-b3fe-374623cdcf06 000

REM                                       Battery                              Reserve battery level                %
Powercfg /SetacValueIndex %_Custom_Power% e73a048d-bf27-4f12-9731-8b2076e8891f f3c5027d-cd16-4930-aa6b-90db844a8f00 007

Powercfg /SETACTIVE %_Custom_Power%
