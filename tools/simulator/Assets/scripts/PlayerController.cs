using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float detectionRadius = 3.0f; // Adjust this radius as needed
    private GameObject targetObject; // Reference to the target object
    private GameObject targetObject2; // Reference to the target object
    private GameObject targetObject3; // Reference to the target object
    public static bool isTriggered = false;
    public static bool isTriggeredTito = false;
    public static bool isTriggeredNASA = false;
    private float startTime = 0.0f;

    private void Start()
    {
        // Find and store a reference to the target object using its name or tag
        targetObject = GameObject.FindWithTag("seismometer");
        targetObject2 = GameObject.FindWithTag("RoverTito_01");
        targetObject3 = GameObject.FindWithTag("NASA");
    }

    private void Update()
    {
        // Calculate the distance between the player and the target object
        float distance = Vector3.Distance(transform.position, targetObject.transform.position);
        float distance2 = Vector3.Distance(transform.position, targetObject2.transform.position);
        float distance3 = Vector3.Distance(transform.position, targetObject3.transform.position);
        // Check if the player is within the detection radius
        Debug.Log(distance3);
        if (distance <= detectionRadius)
        {
            isTriggered = true;
        }
        else
        {
            isTriggered = false;
        }

        if (distance2 <= 4.0)
        {
            isTriggeredTito = true;
        }
        else
        {
            isTriggeredTito = false;
        }
        if(distance3 <= 8)
        {
            isTriggeredNASA = true;
        }
        else
        {
            isTriggeredNASA = false;
        }


    }
}

