<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GoogleDriveService
{
    private string|null $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.google_drive.api_key');
    }

    public function isEnabled(): bool
    {
        return !empty($this->apiKey);
    }

    /**
     * @return array<int, array{id:string,name:string,thumb:string,src:string}>
     */
    public function listImagesInFolder(string $folderId, int $pageSize = 200): array
    {
        if (!$this->isEnabled()) {
            return [];
        }

        $files = [];
        $pageToken = null;

        do {
            $query = sprintf("'%s' in parents and trashed = false and mimeType contains 'image/'", $folderId);

            $response = Http::timeout(10)
                ->retry(2, 250)
                ->get('https://www.googleapis.com/drive/v3/files', [
                    'key' => $this->apiKey,
                    'q' => $query,
                    'pageSize' => $pageSize,
                    'pageToken' => $pageToken,
                    'fields' => 'nextPageToken,files(id,name,mimeType)',
                    'orderBy' => 'name',
                ]);

            if (!$response->ok()) {
                return [];
            }

            $data = $response->json();
            foreach (($data['files'] ?? []) as $file) {
                if (empty($file['id'])) {
                    continue;
                }

                $id = $file['id'];
                $files[] = [
                    'id' => $id,
                    'name' => $file['name'] ?? '',
                    // These URL patterns work well for publicly-shared Drive files
                    'thumb' => "https://drive.google.com/thumbnail?id={$id}&sz=w1000",
                    'src' => "https://drive.google.com/uc?export=view&id={$id}",
                ];
            }

            $pageToken = $data['nextPageToken'] ?? null;
        } while (!empty($pageToken));

        return $files;
    }

    public static function folderIdFromShareUrl(?string $url): ?string
    {
        if (!$url) {
            return null;
        }

        if (preg_match('/\/folders\/([a-zA-Z0-9_-]+)/', $url, $matches)) {
            return $matches[1];
        }

        return null;
    }
}
