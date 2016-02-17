#!/bin/bash

set -e

dir="/Users/Shared/Library/Scripts"
plist="com.monterail.GoToMeeting.plist"
mkdir -p "$dir"

launchctl unload "$HOME/Library/LaunchAgents/$plist" || true

cp GoToMeeting.js "$dir/GoToMeeting.js"
rm -f "$HOME/Library/LaunchAgents/$plist"
cp "$plist" "$HOME/Library/LaunchAgents/$plist"
launchctl load "$HOME/Library/LaunchAgents/$plist"

echo "GoToMeeting integration installed successfully!"
