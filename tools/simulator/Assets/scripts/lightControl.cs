using UnityEngine;

public class lightControl : MonoBehaviour
{
    public Light targetLight; // Reference to the Light component you want to control
    public float intensityChangeSpeed = 4.0f;
    public float maxIntensity = 10.0f;
    private float startTime  = 0.0f;
    private float rampa = -1 / 4;
    private bool state = false;


    private void Start()
    {
        targetLight.intensity = 0;
    }

    private void Update()
    {
        if (PlayerController.isTriggered && !state)
        {
            startTime = Time.time;
            state = true;
        }
        else 

        {
            if (!PlayerController.isTriggered && (Time.time - startTime) >= 4) { 
            state = false;
            targetLight.intensity = 0;
            }
        }
        if (state) {

            float elapsedTime = Time.time - startTime;
            // Calculate the new intensity based on the elapsed time
            float newIntensity = Mathf.Sin(elapsedTime * intensityChangeSpeed) + 1;
            // Apply the new intensity to the light
            targetLight.intensity = newIntensity * maxIntensity;
            if (elapsedTime >= 4)
            {
                targetLight.intensity = 0;
                state = false;
                PlayerController.isTriggered = false;
            }
            // Perform actions or reactions when the trigger event occurs
        }
    }

}

