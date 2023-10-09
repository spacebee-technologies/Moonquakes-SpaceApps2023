using UnityEngine;

public class urlCall : MonoBehaviour
{
    public string urlToOpen = "https://www.example.com"; // The URL you want to open
    public KeyCode keyToPress = KeyCode.Return; // The key to trigger the URL opening

    private void Update()
    {
        if (Input.GetKeyUp(keyToPress))
        {
            Application.OpenURL(urlToOpen);
        }
    }
}