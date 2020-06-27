<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * The mailing address.
 *
 * @see http://schema.org/PostalAddress Documentation on Schema.org
 *
 * @ORM\Entity
 * @ApiResource(
 *     iri="http://schema.org/PostalAddress",
 *     collectionOperations={
 *         "get",
 *         "post": {"security": "is_granted('IS_AUTHENTICATED_FULLY')"}
 *     },
 *     itemOperations={
 *         "get",
 *         "delete": {"security": "is_granted('IS_AUTHENTICATED_FULLY')"},
 *         "put": {"security": "is_granted('IS_AUTHENTICATED_FULLY')"},
 *         "patch": {"security": "is_granted('IS_AUTHENTICATED_FULLY')"}
 *     }
 * )
 */
class PostalAddress
{
    /**
     * @var string|null
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\Column(type="guid")
     * @Assert\Uuid
     */
    private $id;

    /**
     * @var string|null The street address. For example, 1600 Amphitheatre Pkwy.
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/streetAddress")
     */
    private $streetAddress;

    /**
     * @var string The postal code. For example, 94043.
     *
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/postalCode")
     * @Assert\NotNull
     */
    private $postalCode;

    /**
     * @var string The locality in which the street address is, and which is in the region. For example, Mountain View.
     *
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/addressLocality")
     * @Assert\NotNull
     */
    private $addressLocality;

    /**
     * @var string|null The country. For example, USA. You can also provide the two-letter [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1).
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/addressCountry")
     */
    private $addressCountry;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setStreetAddress(?string $streetAddress): void
    {
        $this->streetAddress = $streetAddress;
    }

    public function getStreetAddress(): ?string
    {
        return $this->streetAddress;
    }

    public function setPostalCode(string $postalCode): void
    {
        $this->postalCode = $postalCode;
    }

    public function getPostalCode(): string
    {
        return $this->postalCode;
    }

    public function setAddressLocality(string $addressLocality): void
    {
        $this->addressLocality = $addressLocality;
    }

    public function getAddressLocality(): string
    {
        return $this->addressLocality;
    }

    public function setAddressCountry(?string $addressCountry): void
    {
        $this->addressCountry = $addressCountry;
    }

    public function getAddressCountry(): ?string
    {
        return $this->addressCountry;
    }
}
