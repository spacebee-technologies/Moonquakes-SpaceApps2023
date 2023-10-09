using UnityEngine;
using UnityEngine.UI;

public class appearSeismText : MonoBehaviour
{
    public Canvas canvas; // Reference to the UI Text element you want to toggle
    private bool isVisible = false;

    private void Start()
    {
        // Debug.Log("hola");
        // Set the initial visibility state
        canvas.enabled = isVisible;
    }

    private void Update()
    {
        //Debug.Log(PlayerController.isTriggered);
        // Check the global variable to determine text visibility
        canvas.enabled = PlayerController.isTriggered;
    }
}