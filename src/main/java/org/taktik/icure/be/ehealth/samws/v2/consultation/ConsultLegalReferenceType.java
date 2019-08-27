//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a>
// Any modifications to this file will be lost upon recompilation of the source schema.
// Generated on: 2019.05.22 at 08:11:32 PM CEST
//


package org.taktik.icure.be.ehealth.samws.v2.consultation;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import javax.xml.datatype.XMLGregorianCalendar;
import org.taktik.icure.be.ehealth.samws.v2.reimbursementlaw.submit.LegalReferenceKeyType;
import org.taktik.icure.be.ehealth.samws.v2.reimbursementlaw.submit.LegalReferenceTypeType;


/**
 * <p>Java class for ConsultLegalReferenceType complex type.
 *
 * <p>The following schema fragment specifies the expected content contained within this class.
 *
 * <pre>
 * &lt;complexType name="ConsultLegalReferenceType">
 *   &lt;complexContent>
 *     &lt;extension base="{urn:be:fgov:ehealth:samws:v2:reimbursementlaw:submit}LegalReferenceKeyType">
 *       &lt;sequence>
 *         &lt;element name="Title" type="{urn:be:fgov:ehealth:samws:v2:consultation}ConsultTextType"/>
 *         &lt;element name="Type" type="{urn:be:fgov:ehealth:samws:v2:reimbursementlaw:submit}LegalReferenceTypeType"/>
 *         &lt;element name="FirstPublishedOn" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="LastModifiedOn" type="{http://www.w3.org/2001/XMLSchema}date" minOccurs="0"/>
 *         &lt;element name="LegalReferenceTrace" type="{urn:be:fgov:ehealth:samws:v2:consultation}ConsultLegalReferenceTraceType" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attGroup ref="{urn:be:fgov:ehealth:samws:v2:consultation}validityPeriod"/>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 *
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ConsultLegalReferenceType", propOrder = {
    "title",
    "type",
    "firstPublishedOn",
    "lastModifiedOn",
    "legalReferenceTraces"
})
@XmlSeeAlso({
    ConsultRecursiveLegalReferenceType.class
})
public class ConsultLegalReferenceType
    extends LegalReferenceKeyType
    implements Serializable
{

    private final static long serialVersionUID = 2L;
    @XmlElement(name = "Title", required = true)
    protected ConsultTextType title;
    @XmlElement(name = "Type", required = true)
    @XmlSchemaType(name = "string")
    protected LegalReferenceTypeType type;
    @XmlElement(name = "FirstPublishedOn")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar firstPublishedOn;
    @XmlElement(name = "LastModifiedOn")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar lastModifiedOn;
    @XmlElement(name = "LegalReferenceTrace")
    protected List<ConsultLegalReferenceTraceType> legalReferenceTraces;
    @XmlAttribute(name = "StartDate", required = true)
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar startDate;
    @XmlAttribute(name = "EndDate")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar endDate;

    /**
     * Gets the value of the title property.
     *
     * @return
     *     possible object is
     *     {@link ConsultTextType }
     *
     */
    public ConsultTextType getTitle() {
        return title;
    }

    /**
     * Sets the value of the title property.
     *
     * @param value
     *     allowed object is
     *     {@link ConsultTextType }
     *
     */
    public void setTitle(ConsultTextType value) {
        this.title = value;
    }

    /**
     * Gets the value of the type property.
     *
     * @return
     *     possible object is
     *     {@link LegalReferenceTypeType }
     *
     */
    public LegalReferenceTypeType getType() {
        return type;
    }

    /**
     * Sets the value of the type property.
     *
     * @param value
     *     allowed object is
     *     {@link LegalReferenceTypeType }
     *
     */
    public void setType(LegalReferenceTypeType value) {
        this.type = value;
    }

    /**
     * Gets the value of the firstPublishedOn property.
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getFirstPublishedOn() {
        return firstPublishedOn;
    }

    /**
     * Sets the value of the firstPublishedOn property.
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setFirstPublishedOn(XMLGregorianCalendar value) {
        this.firstPublishedOn = value;
    }

    /**
     * Gets the value of the lastModifiedOn property.
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getLastModifiedOn() {
        return lastModifiedOn;
    }

    /**
     * Sets the value of the lastModifiedOn property.
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setLastModifiedOn(XMLGregorianCalendar value) {
        this.lastModifiedOn = value;
    }

    /**
     * Gets the value of the legalReferenceTraces property.
     *
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the legalReferenceTraces property.
     *
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getLegalReferenceTraces().add(newItem);
     * </pre>
     *
     *
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ConsultLegalReferenceTraceType }
     *
     *
     */
    public List<ConsultLegalReferenceTraceType> getLegalReferenceTraces() {
        if (legalReferenceTraces == null) {
            legalReferenceTraces = new ArrayList<ConsultLegalReferenceTraceType>();
        }
        return this.legalReferenceTraces;
    }

    /**
     * Gets the value of the startDate property.
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getStartDate() {
        return startDate;
    }

    /**
     * Sets the value of the startDate property.
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setStartDate(XMLGregorianCalendar value) {
        this.startDate = value;
    }

    /**
     * Gets the value of the endDate property.
     *
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public XMLGregorianCalendar getEndDate() {
        return endDate;
    }

    /**
     * Sets the value of the endDate property.
     *
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *
     */
    public void setEndDate(XMLGregorianCalendar value) {
        this.endDate = value;
    }

}
