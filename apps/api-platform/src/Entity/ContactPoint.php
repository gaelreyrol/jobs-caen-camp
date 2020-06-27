<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * A contact point—for example, a Customer Complaints department.
 *
 * @see http://schema.org/ContactPoint Documentation on Schema.org
 *
 * @ORM\Entity
 * @ApiResource(
 *     iri="http://schema.org/ContactPoint",
 *     collectionOperations={
 *         "get",
 *         "post": {"security": "is_granted('IS_AUTHENTICATED_FULLY')"},
 *     },
 *     itemOperations={
 *         "get",
 *         "delete": {"security": "is_granted('IS_AUTHENTICATED_FULLY')"},
 *         "put": {"security": "is_granted('IS_AUTHENTICATED_FULLY')"},
 *         "patch": {"security": "is_granted('IS_AUTHENTICATED_FULLY')"}
 *     }
 * )
 */
class ContactPoint
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
     * @var string email address
     *
     * @ORM\Column(type="text")
     * @ApiProperty(iri="http://schema.org/email")
     * @Assert\Email
     * @Assert\NotNull
     */
    private $email;

    /**
     * @var string|null the telephone number
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/telephone")
     */
    private $telephone;

    /**
     * @var string|null A person or organization can have different contact points, for different purposes. For example, a sales contact point, a PR contact point and so on. This property is used to specify the kind of contact point.
     *
     * @ORM\Column(type="text", nullable=true)
     * @ApiProperty(iri="http://schema.org/contactType")
     */
    private $contactType;

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

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setTelephone(?string $telephone): void
    {
        $this->telephone = $telephone;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setContactType(?string $contactType): void
    {
        $this->contactType = $contactType;
    }

    public function getContactType(): ?string
    {
        return $this->contactType;
    }
}
