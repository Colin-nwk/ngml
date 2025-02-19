<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerDocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_by_user_id' => $this->created_by_user_id,
            'customer_id' => $this->customer_id,
            'customer_site_id' => $this->customer_site_id,
            'document_name' => $this->document_name,
            'document_description' => $this->document_description,
            'document_type' => $this->document_type,
            'document_metadata' => $this->document_metadata,
            'document_date' => $this->document_date?->toDateString(),
            'approval_status' => $this->approval_status,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'created_by_user' => new UserResource($this->whenLoaded('created_by_user')),
            'customer' => new CustomerResource($this->whenLoaded('customer')),
            'customer_site' => new CustomerSiteResource($this->whenLoaded('customer_site'))
        ];
    }
}
