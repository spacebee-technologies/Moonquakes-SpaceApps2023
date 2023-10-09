using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class startButton : MonoBehaviour
{
    public GameObject pic;
    public void Trigger()
    {
        if (pic.activeInHierarchy == false)
        {
            pic.SetActive(true);

        }
        else
        {
            pic.SetActive(false);
        }
    }
}
