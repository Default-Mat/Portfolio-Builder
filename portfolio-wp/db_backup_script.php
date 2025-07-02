<?php
// Database configuration
$host = 'localhost';
$user = 'root';
$password = '3412909';
$database = 'portfolio';
$backup_dir = __DIR__ . '\\DB_Backups\\';

// Create backup directory if it doesn't exist
if (!file_exists($backup_dir)) {
    mkdir($backup_dir, 0755, true);
}

// Delete all previous backup files before creating new one
array_map('unlink', glob($backup_dir . 'backup-*.*'));

// Set backup file path with date
$backup_file = $backup_dir . 'backup-' . date('Y-m-d_H-i-s') . '.sql';

// MySQL dump command (Windows version)
$command = "C:\\xampp\\mysql\\bin\\mysqldump.exe --opt -h $host -u $user " . 
           ($password ? "-p\"$password\" " : "") . 
           "$database > \"$backup_file\"";

// Execute command
system($command, $result);

// Verify backup
if ($result === 0) {
    // Compress the backup using Windows native ZIP
    $zip_file = $backup_dir . 'portfolio-latest-backup.zip'; // Constant name
    $zip_command = "powershell Compress-Archive -Path \"$backup_file\" -DestinationPath \"$zip_file\" -Force";
    system($zip_command, $zip_result);

    if ($zip_result === 0) {
        // Delete the uncompressed SQL file after zipping
        unlink($backup_file);
        echo "Backup successful (ZIP compressed): $zip_file";
    } else {
        rename($backup_file, $backup_dir . 'portfolio-latest-backup.sql');
        echo "Backup successful (uncompressed): " . $backup_dir . 'portfolio-latest-backup.sql';
    }
} else {
    echo "Backup failed with error code: $result";
}
?>