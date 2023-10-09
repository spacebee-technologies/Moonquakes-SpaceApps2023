using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class waveParticlesController : MonoBehaviour
{
    public ParticleSystem waveParticleSystem;
    public float waveInterval = 1.0f; // Time between waves in seconds
    public int maxWaves = 5; // Maximum number of waves

    private float timeSinceLastWave = 0.0f;
    private int waveCount = 0;

    void Update()
    {
        // Check if it's time to emit a new wave
        timeSinceLastWave += Time.deltaTime;
        if (timeSinceLastWave >= waveInterval && waveCount < maxWaves)
        {
            EmitWave();
            waveCount++;
            timeSinceLastWave = 0.0f;
        }
    }

    void EmitWave()
    {
        // Emit a wave of particles
        waveParticleSystem.Play();
    }
}