package com.excelsior.mshack;

import android.os.AsyncTask;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.HttpParams;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

public abstract class HttpReqRes extends AsyncTask<HashMap<String, String>, Void, String> {

    public abstract void Callback(String response);

    @Override
    protected String doInBackground(HashMap... param) {

        HashMap<String, String> request = param[0];
        try {
            HttpClient client = new DefaultHttpClient();
            StringBuilder reqBuilder = new StringBuilder(request.get("domain"));
            for(Map.Entry entry: request.entrySet()){
                if(entry.getKey().equals("domain")) continue;
                reqBuilder.append(entry.getKey().toString() + "=" + entry.getValue().toString() + "&");
            }
            reqBuilder.deleteCharAt(reqBuilder.length()-1);
            URI website = new URI(reqBuilder.toString());
            HttpGet req = new HttpGet();

            req.setURI(website);
            HttpResponse response = client.execute(req);

            return response.getParams().toString();
        }catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }
}
