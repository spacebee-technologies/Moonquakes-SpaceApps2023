using UnityEngine;

public class rotatingGlobe : MonoBehaviour
{
    public float rotationSpeed = 60.0f; // Adjust the speed of rotation

    void Update()
    {
        // Rotate the object around its Y-axis
        transform.Rotate(Vector3.left * rotationSpeed * Time.deltaTime);
    }
}