local nuiReady = false

local function updateHUD(action, data)
    if not nuiReady then return end
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