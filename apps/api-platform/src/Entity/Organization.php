<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * An organization such as a school, NGO, corporation, club, etc.
 *
 * @see http://schema.org/Organization Documentation on Schema.org
 *
 * @ORM\Entity
 * @ApiResource(iri="http://schema.org/Organization")
 */
class Organization
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
     * @var string the name of the item
     *
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/name")
     * @Assert\NotNull
     */
    private $name;

    /**
     * @var string|null a description of the item
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/description")
     */
    private $description;

    /**
     * @var string URL of the item
     *
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/url")
     * @Assert\Url
     * @Assert\NotNull
     */
    private $url;

    /**
     * @var string email address
     *
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/email")
     * @Assert\Email
     * @Assert\NotNull
     */
    private $email;

    /**
     * @var string|null An image of the item. This can be a [URL](http://schema.org/URL) or a fully described [ImageObject](http://schema.org/ImageObject).
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/image")
     * @Assert\Url
     */
    private $image;

    /**
     * @var PostalAddress|null physical address of the item
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\PostalAddress")
     * @ApiProperty(iri="http://schema.org/address")
     */
    private $address;

    /**
     * @var ContactPoint|null a contact point for a person or organization
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ContactPoint")
     * @ApiProperty(iri="http://schema.org/contactPoints")
     */
    private $contactPoint;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setUrl(string $url): void
    {
        $this->url = $url;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setImage(?string $image): void
    {
        $this->image = $image;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setAddress(?PostalAddress $address): void
    {
        $this->address = $address;
    }

    public function getAddress(): ?PostalAddress
    {
        return $this->address;
    }

    public function setContactPoint(?ContactPoint $contactPoint): void
    {
        $this->contactPoint = $contactPoint;
    }

    public function getContactPoint(): ?ContactPoint
    {
        return $this->contactPoint;
    }
}
