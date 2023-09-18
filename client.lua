local nuiReady = false
local show = false
local dev = false
local voice = 33
local stamina = 100
local armed = false
local unarmed = -1609580060
local parachute = false

local function updateHUD(action, data)
    SendNUIMessage({ action = action, data = data})
end

local function loadMap() -- Credit to Dalrae for the solve.
    local defaultAspectRatio = 1920/1080 -- Don't change this.
    local resolutionX, resolutionY = GetActiveScreenResolution()
    local aspectRatio = resolutionX/resolutionY
    local minimapOffset = 0
    if aspectRatio > defaultAspectRatio then
        minimapOffset = ((defaultAspectRatio-aspectRatio)/3.6)-0.008
    end
    RequestStreamedTextureDict("squaremap", false)
    if not HasStreamedTextureDictLoaded("squaremap") then
        Wait(150)
    end
    SetMinimapClipType(0)
    AddReplaceTexture("platform:/textures/graphics", "radarmasksm", "squaremap", "radarmasksm")
    AddReplaceTexture("platform:/textures/graphics", "radarmask1g", "squaremap", "radarmasksm")
    -- 0.0 = nav symbol and icons left
    -- 0.1638 = nav symbol and icons stretched
    -- 0.216 = nav symbol and icons raised up
    SetMinimapComponentPosition("minimap", "L", "B", 0.0 + minimapOffset, -0.047, 0.1638, 0.183)

    -- icons within map
    SetMinimapComponentPosition("minimap_mask", "L", "B", 0.0 + minimapOffset, 0.0, 0.128, 0.20)

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

CreateThread(function()
    while true do
        if nuiReady then
            local playerId = PlayerId()
            local ped = PlayerPedId()
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
                stamina = stamina,
                armed = armed,
                dev = dev
            })
        else
            updateHUD('player', { show = false })
        end
        Wait(200)
    end
end)
