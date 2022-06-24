package com.newproject; // Change this to your package name.

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import com.newproject.MainActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.e("check", "yahan aya");

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}