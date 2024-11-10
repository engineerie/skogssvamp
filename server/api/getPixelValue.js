import ee from "@google/earthengine";

// Initialize the Earth Engine API (this needs to be done once)
async function initializeEarthEngine() {
  if (!ee.data.authToken) {
    await ee.initialize();
  }
}

export default async function handler(req, res) {
  try {
    // Ensure Earth Engine API is initialized
    await initializeEarthEngine();

    const { lat, lng } = req.query;

    // Create a point at the requested lat/lng
    const point = ee.Geometry.Point([lng, lat]);

    // Reference your specific image layer (replace with your asset ID)
    const image = ee.Image(
      "projects/ee-jacobbertilsson/assets/nmd2018bas_ogeneraliserad_v1_1"
    );

    // Sample the image at the point location
    const pixelValue = await image
      .reduceRegion({
        reducer: ee.Reducer.first(),
        geometry: point,
        scale: 30,
        maxPixels: 1e3,
      })
      .getInfo();

    // Send pixel value as the response
    res.status(200).json({ pixelValue });
  } catch (error) {
    console.error("Error fetching pixel value:", error);
    res.status(500).json({ error: "Failed to fetch pixel value" });
  }
}
