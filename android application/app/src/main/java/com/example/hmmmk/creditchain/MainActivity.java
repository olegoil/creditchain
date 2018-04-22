package com.example.hmmmk.creditchain;

import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.google.firebase.FirebaseApp;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends AppCompatActivity {

    Button accept, decline;
    LinearLayout start, good, bad;
    ImageView img1, img2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_accept);
        FirebaseApp.initializeApp(this);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            String channelId = "fcm_default_channel";
            String channelName = "Name";
            NotificationManager notificationManager =
                    getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(new NotificationChannel(channelId,
                    channelName, NotificationManager.IMPORTANCE_LOW));
        }


        Log.d("FCM ID", FirebaseInstanceId.getInstance().getId());
        Log.d("FCM TOKEN", FirebaseInstanceId.getInstance().getToken());
        FirebaseMessaging.getInstance().subscribeToTopic("news");

        initViews();
    }

    private void initViews() {
        accept = findViewById(R.id.accept_btn);
        accept.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onGood();
            }
        });
        decline = findViewById(R.id.decline_btn);
        decline.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onBad();
            }
        });

        start = findViewById(R.id.accept_container);
        good = findViewById(R.id.good_container);
        bad = findViewById(R.id.bad_container);

        img1 = findViewById(R.id.left);
        img2 = findViewById(R.id.right);
    }

    final Activity activity = this;

    private void onGood() {
        start.setVisibility(View.INVISIBLE);
        good.setVisibility(View.VISIBLE);

        new Thread(new Runnable() {
            @Override
            public void run() {
                do {
                    try {
                        Thread.sleep(250);

                        activity.runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                changeVisibility();
                            }
                        });
                    } catch (InterruptedException e) {e.printStackTrace();}
                } while (true);
            }
        }).start();
    }

    private void onBad() {
        start.setVisibility(View.INVISIBLE);
        bad.setVisibility(View.VISIBLE);
    }

    boolean flag = true;

    private void changeVisibility() {
        if (flag) {
            img1.setVisibility(View.INVISIBLE);
            img2.setVisibility(View.VISIBLE);
        }
        else {
            img1.setVisibility(View.VISIBLE);
            img2.setVisibility(View.INVISIBLE);
        }

        flag = !flag;
    }
}
