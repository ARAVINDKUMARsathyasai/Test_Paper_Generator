package com.testpaper.helper;

public class TestCountResponse {
    private long activeCount;
    private long totalCount;

    public TestCountResponse(long activeCount, long totalCount) {
        this.activeCount = activeCount;
        this.totalCount = totalCount;
    }

    public long getActiveCount() {
        return activeCount;
    }

    public long getTotalCount() {
        return totalCount;
    }
}
