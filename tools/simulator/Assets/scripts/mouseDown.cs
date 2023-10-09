using UnityEngine;

public class mouseDown : MonoBehaviour
{
    private void Update()
    {
        if (Input.GetMouseButtonDown(0)) // Left mouse button (change to 1 for right button, 2 for middle button)
        {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit))
            {
                if (hit.collider.gameObject == gameObject)
                {
                    // This code runs when the object is clicked.
                    Debug.Log("Object Clicked!");
                }
            }
        }
    }
}