local nuiReady = false
local show = false
local dev = false
local voice = 33
local hunger = -1
local thirst = -1
local stress = -1
local stamina = 100
local armed = false
local unarmed = -1609580060
local seatbelt = false

---Update the HUD with new data
---@param action string -- Action to perform
---@param data string | table | number | boolean -- Data to send to the HUD
local function updateHUD(action, data)
    SendNUIMessage({ action = action, data = data })
end

local function loadMap() -- Credit to Dalrae for the solve.
    local defaultAspectRatio = 1920/1080 -- Don't change this.
    local resolutionX, resolutionY = GetActiveScreenResolution()
    local aspectRatio = resolutionX/resolutionY
    local minimapOffset = 0
    if aspectRatio > defaultAspectRatio then
        minimapOffset = ((defaultAspectRatio-aspectRatio)/3.6)-0.008
    end

    RequestStreamedTextureDict('squaremap', false)
    if not HasStreamedTextureDictLoaded('squaremap') then
        Wait(150)
    end

    SetMinimapClipType(0)
    AddReplaceTexture('platform:/textures/graphics', 'radarmasksm', 'squaremap', 'radarmasksm')
    AddReplaceTexture('platform:/textures/graphics', 'radarmask1g', 'squaremap', 'radarmasksm')
    -- 0.0 = nav symbol and icons left
    -- 0.1638 = nav symbol and icons stretched
    -- 0.216 = nav symbol and icons raised up
    SetMinimapComponentPosition('minimap', 'L', 'B', 0.0 + minimapOffset, -0.047, 0.1638, 0.183)

    -- icons within map
    SetMinimapComponentPosition('minimap_mask', 'L', 'B', 0.0 + minimapOffset, 0.0, 0.128, 0.20)

    -- -0.01 = map pulled left
    -- 0.025 = map raised up
    -- 0.262 = map stretched
    -- 0.315 = map shorten
    SetMinimapComponentPosition('minimap_blur', 'L', 'B', -0.01 + minimapOffset, 0.025, 0.262, 0.300)
    SetBlipAlpha(GetNorthRadarBlip(), 0)
    SetRadarBigmapEnabled(true, false)
    SetMinimapClipType(0)
    Wait(50)

    SetRadarBigmapEnabled(false, false)
end

RegisterNUICallback('init', function(_, cb)
    cb(1)
    nuiReady = true
    Wait(100)
    loadMap()
end)

local lastCrossroadUpdate = 0
local lastCrossroadCheck = {}

local function getCrossroads(player)
    local updateTick = GetGameTimer()
    if updateTick - lastCrossroadUpdate > 1500 then
        local pos = GetEntityCoords(player)
        local street1, street2 = GetStreetNameAtCoord(pos.x, pos.y, pos.z)
        lastCrossroadUpdate = updateTick
        lastCrossroadCheck = { GetStreetNameFromHashKey(street1), GetStreetNameFromHashKey(street2) }
    end
    return lastCrossroadCheck
end

---@param heading number
---@return string direction
local function convertHeading(heading)
    local direction = "N"
    if heading >= 0 and heading <= 22.5 then
        direction = "N"
    elseif heading > 22.5 and heading <= 67.5 then
        direction = "NW"
    elseif heading > 67.5 and heading <= 112.5 then
        direction = "W"
    elseif heading > 112.5 and heading <= 157.5 then
        direction = "SW"
    elseif heading > 157.5 and heading <= 202.5 then
        direction = "S"
    elseif heading > 202.5 and heading <= 247.5 then
        direction = "SE"
    elseif heading > 247.5 and heading <= 292.5 then
        direction = "E"
    elseif heading > 292.5 and heading <= 337.5 then
        direction = "NE"
    elseif heading > 337.5 and heading <= 360.0 then
        direction = "N"
    end

    return direction
end

if GetResourceState('qb-core') == 'started' then
    local QBCore = exports['qb-core']:GetCoreObject()

    AddEventHandler('onResourceStart', function(resourceName)
        if GetCurrentResourceName() ~= resourceName then return end
        local PlayerData = QBCore.Functions.GetPlayerData()
        Wait(100)

        if PlayerData and LocalPlayer.state['isLoggedIn'] then
            hunger = PlayerData.metadata.hunger
            thirst = PlayerData.metadata.thirst
            stress = PlayerData.metadata.stress
        end
    end)

    RegisterNetEvent("QBCore:Client:OnPlayerLoaded", function()
        local PlayerData = QBCore.Functions.GetPlayerData()
        Wait(100)
        if PlayerData then
            hunger = PlayerData.metadata.hunger
            thirst = PlayerData.metadata.thirst
            stress = PlayerData.metadata.stress
        end
        show = true
    end)

    RegisterNetEvent('hud:client:UpdateNeeds', function(newHunger, newThirst) -- Triggered in qb-core
        hunger = newHunger
        thirst = newThirst
    end)

    RegisterNetEvent("QBCore:Client:OnPlayerUnload", function()
        Wait(100)
        hunger = -1
        thirst = -1
        stress = -1
        DisplayRadar(false)
        show = false
    end)

end

CreateThread(function()
    while true do
        if nuiReady then
            local playerId = cache.playerId
            local ped = cache.ped
            show = true
            local paused = IsPauseMenuActive()
            if paused then
                show = false
            end

            -- armed
            local weapon = GetSelectedPedWeapon(ped)
            local weaponType = GetWeapontypeGroup(weapon)
            if weaponType == unarmed then
                armed = false
            else
                armed = true
            end

            -- Stamina/Oxygen
            if not IsEntityInWater(ped) then
                stamina = 100 - GetPlayerSprintStaminaRemaining(playerId)
            end
            -- Oxygen
            if IsEntityInWater(ped) then
                stamina = GetPlayerUnderwaterTimeRemaining(playerId) * 10
            end

            if LocalPlayer.state['proximity'] then
                voice = LocalPlayer.state['proximity'].distance
            end

            updateHUD('player', {
                show = show,
                voice = voice,
                talking = NetworkIsPlayerTalking(playerId),
                health = GetEntityHealth(ped) - 100,
                armour = GetPedArmour(ped),
                hunger = hunger,
                thirst = thirst,
                stress = stress,
                stamina = stamina,
                armed = armed,
                dev = dev
            })
            DisplayRadar(false)

            -- Vehicle
            local vehicle = GetVehiclePedIsIn(ped, false)
            if (IsPedInAnyVehicle(ped) and not IsThisModelABicycle(vehicle)) and GetIsVehicleEngineRunning(vehicle) then -- In a vehicle
                local crossroads = getCrossroads(ped)
                DisplayRadar(true)
                updateHUD('vehicle', {
                    show = show,
                    speed = math.ceil(GetEntitySpeed(vehicle) * 2.236936),
                    maxSpeed = math.ceil(GetVehicleHandlingFloat(vehicle, 'CHandlingData', 'fInitialDriveMaxFlatVel')),
                    rpm = GetVehicleCurrentRpm(vehicle),
                    gear = GetVehicleCurrentGear(vehicle),
                    fuel = GetVehicleFuelLevel(vehicle),
                    engine = (GetVehicleEngineHealth(vehicle) / 10),
                    locked = GetVehicleDoorLockStatus(vehicle),
                    seatbelt = seatbelt,
                })

                -- compass
                local heading = GetEntityHeading(ped)
                local coords = GetEntityCoords(ped)
                updateHUD('compass', {
                    show = true,
                    crossroads = crossroads,
                    heading = convertHeading(heading),
                    zone = GetLabelText(GetNameOfZone(coords.x, coords.y, coords.z))
                })
            else -- Not in a vehicle
                updateHUD('vehicle', { show = false })
                updateHUD('compass', { show = false })
            end
        else
            updateHUD('player', { show = false })
            updateHUD('vehicle', { show = false })
            updateHUD('compass', { show = false })
        end
        Wait(200)
    end
end)
