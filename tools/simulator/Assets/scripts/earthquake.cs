using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class earthquake : MonoBehaviour
{
    public Camera mainCamera;
    public ParticleSystem debrisParticleSystem;
    public Transform terrain;
    public float earthquakeDuration = 10.0f;
    public float shakeIntensity = 0.1f;

    private float startTime;
    private bool state = false;

    void Start()
    {
    }
    private void Update()
    {
        if (PlayerController.isTriggered && state == false && (Time.time - startTime) >= 5)
        {
            startTime = Time.time;
            state = true;
            PlayEarthquakeEffects();
        }
        else
        {
                state = false;
        }
    }
    void PlayEarthquakeEffects()
    {
        // Start the earthquake visual effects
        StartCoroutine(ShakeCamera());
        // PlayDebrisParticles();
        // StartCoroutine(DeformTerrain());
    }


    IEnumerator ShakeCamera()
    {
        float elapsedTime = 0f;
        Vector3 originalPosition = mainCamera.transform.position;

        while (elapsedTime < earthquakeDuration)
        {
            float xOffset = Random.Range(-shakeIntensity, shakeIntensity);
            float yOffset = Random.Range(-shakeIntensity, shakeIntensity);

            mainCamera.transform.position = originalPosition + new Vector3(xOffset, yOffset, 0f);

            elapsedTime += Time.deltaTime;
            yield return null;
        }

        // Reset the camera position
        mainCamera.transform.position = originalPosition;
    }

    void PlayDebrisParticles()
    {
        // Start the debris particle system
        debrisParticleSystem.Play();
    }

    IEnumerator DeformTerrain()
    {
        // Simulate terrain deformation (e.g., displacement of vertices)
        yield return new WaitForSeconds(2.0f); // Delay before starting terrain deformation

        // Modify the terrain vertices to simulate deformation
        Terrain terrainComponent = terrain.GetComponent<Terrain>();
        TerrainData terrainData = terrainComponent.terrainData;

        int numVerticesX = terrainData.heightmapResolution;
        int numVerticesZ = terrainData.heightmapResolution;
        float[,] heights = new float[numVerticesX, numVerticesZ];

        float deformationAmount = 0.1f;
        float deformationDuration = 5.0f;

        for (int x = 0; x < numVerticesX; x++)
        {
            for (int z = 0; z < numVerticesZ; z++)
            {
                float originalHeight = terrainData.GetHeight(x, z);
                float deformationStartTime = Time.time;

                while (Time.time - deformationStartTime < deformationDuration)
                {
                    float deformationProgress = (Time.time - deformationStartTime) / deformationDuration;
                    float deformHeight = originalHeight + deformationAmount * Mathf.Sin(deformationProgress * Mathf.PI);
                    heights[x, z] = deformHeight;
                    terrainData.SetHeights(x, z, heights);
                    yield return null;
                }

                heights[x, z] = originalHeight;
                terrainData.SetHeights(x, z, heights);
            }
        }
    }
}