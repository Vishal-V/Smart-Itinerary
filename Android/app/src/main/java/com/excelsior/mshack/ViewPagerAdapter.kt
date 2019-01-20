package com.excelsior.mshack

import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentPagerAdapter

class ViewPagerAdapter(fm: FragmentManager) : FragmentPagerAdapter(fm) {

    var timeFragment = TimeFragment()
    var mapFragment = MapFragment()

    override fun getItem(i: Int): Fragment? {
        when(i) {
            0 -> return timeFragment
            1 -> return mapFragment
        }
        return null
    }

    override fun getCount(): Int {
        return 2
    }
}
