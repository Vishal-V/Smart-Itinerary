package com.excelsior.mshack;

import android.graphics.Canvas;
import android.location.Location;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.support.design.widget.FloatingActionButton;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MapFragment extends Fragment {

    @Override
    public View onCreateView(@NonNull LayoutInflater inflator, ViewGroup container, Bundle savedInstanceState) {
        super.onCreateView(inflator, container, savedInstanceState);
        View view = View.inflate(getContext(), R.layout.fragment_map, null);

        WebView mapView = view.findViewById(R.id.map);
        mapView.getSettings().setJavaScriptEnabled(true);
        mapView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        mapView.setWebChromeClient(new WebChromeClient());
        mapView.setWebViewClient(new WebViewClient(){
            on
        });
        mapView.loadUrl("http://a16a82e0.ngrok.io/POIs");
        return view;
    }
}
